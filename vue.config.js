'use strict'

const port = 8081 // dev port

module.exports = {
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV === 'development' ? 'error' : false,
  productionSourceMap: false,
  devServer: {
    port: port,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    // proxy: {
    //   // change xxx-api/login => mock/login
    //   // detail: https://cli.vuejs.org/config/#devserver-proxy
    //   [process.env.VUE_APP_BASE_API]: {
    //     target: `http://localhost:${port}/mock`,
    //     changeOrigin: true,
    //     pathRewrite: {
    //       ['^' + process.env.VUE_APP_BASE_API]: ''
    //     }
    //   }
    // },
    proxy: {
      '/api': {
      target: 'http://172.20.10.2:8081', //后端地址
      secure: false,  // 如果是https接口，需要配置这个参数
      ws: true,//是否代理websockets
      changeOrigin: true,
        pathRewrite: {
          '^/api': ''
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