import axios from 'axios';
import qs from 'qs';
import { BASE_URL, TIME_OUT } from './config';

import type { AxiosInstance } from 'axios';
import type { ServiceInterceptors, privateRequestConifg } from './type';

/* 重复请求取消 */
const pending = new Map();
/**
 * 添加请求
 * @param {Object} config
 */
const addPending = (config: privateRequestConifg): void => {
  const url = [
    config.method,
    config.url,
    qs.stringify(config.params),
    qs.stringify(config.data),
  ].join('&');

  config.cancelToken =
    config.cancelToken ||
    new axios.CancelToken((cancel) => {
      if (!pending.has(url)) {
        // 如果 pending 中不存在当前请求，则添加进去
        pending.set(url, cancel);
      }
    });
};
/**
 * 移除请求
 * @param {Object} config
 */
const removePending = (config: privateRequestConifg): void => {
  const url = [
    config.method,
    config.url,
    qs.stringify(config.params),
    qs.stringify(config.data),
  ].join('&');
  if (pending.has(url)) {
    // 如果在 pending 中存在当前请求标识，需要取消当前请求，并且移除
    const cancel = pending.get(url);
    cancel(url);
    pending.delete(url);
  }
};

/**
 * 清空 pending 中的请求（在路由跳转时调用）
 */
export const clearPending = (): void => {
  for (const [url, cancel] of pending) {
    cancel(url);
  }
  pending.clear();
};

/* 基础实例 */
class Service {
  instance: AxiosInstance; // 实例
  interceptors?: ServiceInterceptors; // 拦截器

  constructor(config: privateRequestConifg) {
    // 创建axios实例
    this.instance = axios.create(config);
    // 保存信息
    this.interceptors = config.interceptors;

    // 拦截器的拓展
    // 1、接口配置拦截器特殊处理合并特殊处理
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    );

    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    );

    // 2、所有实例拦截器的统一处理
    this.instance.interceptors.request.use(
      (config) => {
        removePending(config); // 在请求开始前，对之前的请求做检查取消操作
        addPending(config); // 将当前请求添加到 pending 中

        return config;
      },
      (err) => {
        return err;
      }
    );

    this.instance.interceptors.response.use(
      (res) => {
        // 响应拦截处理
        removePending(res); // 在请求结束后，移除本次请求
        // 关闭加载动画
        // this.loading?.close();

        return res;
      },
      (err) => {
        // 接口请求失败处理
        // this.loading?.close();
        console.log(err);

        return err;
      }
    );
  }

  request<T>(config: privateRequestConifg): Promise<T> {
    return new Promise((resolve, reject) => {
      /* 单个接口自定义配置处理 */
      // 1、自定义拦截器
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config);
      }

      this.instance
        .request<any, T>(config)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
          return err;
        });
    });
  }
}
const baseService = new Service({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
});

export default baseService;
