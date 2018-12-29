// 自定义webpack的配置，该文件会合并入最终的 webpack 配置
module.exports = {
  baseUrl: process.env.NODE_ENV != 'production' ? '/' :  // 部署应用包时的基本 URL。
    'https://res.purcotton.com/wap/h5/2018/12/27/ngh/' ,  // 内购会
  outputDir: 'dist', // 当运行 vue-cli-service build 时生成的生产环境构建文件的目录。
  assetsDir: 'assets', // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
  // indexPath: 'index.html', // 指定生成的 index.html 的输出路径 (相对于 outputDir)。也可以是一个绝对路径。
  // filenameHashing: false, // 关闭资源文件添加hash值
  devServer: {
    port: 5060, // 修改默认端口
    https: false, // https:{type:Boolean}
    open: false, // 配置自动启动浏览器
    proxy: { // 配置开发代理
      '/api': {
        target: 'https://m.purcotton.com/', // 代理线上wap接口
        // target: 'https://app.purcotton.com/',  // 代理线上app端接口
        // target: 'https://m-test.purcotton.com/', // 代理测试wap接口
        // target: 'https://app-test.purcotton.com/', // 代理测试app接口
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  productionSourceMap: false, // 生产环境是否生成 sourceMap 文件
}