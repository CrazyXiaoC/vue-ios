'use strict'

module.exports = {
  devServer: {
    port: 8081,
    open: true,
    proxy: {
      '/api': { // 匹配所有以 '/api'开头的请求路径
        target: 'http://172.20.10.2:8081', //代理目标的基础路径
        secure: false,  // 如果是https接口，需要配置这个参数
        changeOrigin: true, // 是否支持跨域
        pathRewrite: {  // 路径重写
          '^/api': '' // 使用 `/api` 代替 `target` 要访问的跨域的域名
        }
      }
    }
  },
  chainWebpack: config => {
    const svgRule = config.module.rule("svg");
    svgRule.uses.clear();
    svgRule.exclude.add(/node_modules/) // 正则匹配排除node_modules目录
    svgRule
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]",
        include: ["./src/icons"]
      });
  }
};