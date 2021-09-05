import { AxiosRequestConfig, AxiosResponse } from 'axios';

export interface ServiceInterceptors {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig;
  requestInterceptorCatch?: (error: any) => any;
  responseInterceptor?: (res: AxiosResponse) => AxiosResponse;
  responseInterceptorCatch?: (error: any) => any;
}

// 基于AxiosRequestConfig类型添加动态配置拦截器属性interceptors
export interface privateRequestConifg<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: ServiceInterceptors;
  showLoading?: boolean;
}
