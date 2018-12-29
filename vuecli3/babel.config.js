// 配置Babel ,Vue CLI 使用了 Babel 7 中的新配置格式 babel.config.js。
module.exports = {
  presets: [
    ['@vue/app', {
      polyfills: [
        'es6.promise',
        'es6.symbol'
      ]
    }]
  ],
  // babel-plugin-import 是一款 babel 插件，它会在编译过程中将 import 的写法自动转换为按需引入的方式
  // babel-plugin-import 配置
  plugins: [
    ['import', {
      libraryName: 'vant',
      libraryDirectory: 'es',
      style: true
    }, 'vant']
  ]
}
