module.exports = {
  // 1、cli提供属性
  // 2、webpack合并配置项
  configureWebpack: {
    resolve: {
      // 别名配置
      alias: {
        _comp: '@/components',
      },
    },
  },
};
