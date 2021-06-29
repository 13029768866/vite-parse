// 读取所有的环境变量注入到process.env
export function wrapperEnv(envConf: Recordable): ViteEnv {
  const res: any = {};
  Object.keys(envConf).forEach((item: string) => {
    // 去除空格
    let realName = envConf[item].replace(/\\n/g, '\n');
    // 布尔值处理
    realName = realName === 'true' ? true : realName === 'false' ? false : realName;
    // 端口，代理处理
    if (item === 'VITE_PORT') {
      realName = Number(realName);
    }
    if (item === 'VITE_PROXY') {
      try {
        realName = JSON.parse(realName);
      } catch (error) {}
    }
    res[item] = realName;
    process.env[item] = realName;
  });
  return res;
}
