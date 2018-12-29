import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引入iconfont图标js,会在页面body下添加svg标签
import '@/assets/js/iconfont.js'
// 引入基础样式
import '@/assets/css/index.css'

import { getHostPlatform } from '@/assets/js/config.js'
//注册全局函数和全局常量,在vue页面之间用this即可访问
// retype为运行环境，m为wap端，app为app端
Vue.prototype.retype = getHostPlatform()
// Vue.prototype.retype = 'app'

// vConsole在IE9无法正常使用，会报错  vConsole无法在安卓webview使用，报错mSwiper
// import vConsole from 'vconsole'
// let console = new vConsole()

// 全局注册vant组件
import { Loading, Toast, Lazyload, Field, Cell, CellGroup, Button } from 'vant'
Vue.use(Loading).use(Toast).use(Lazyload).use(Field).use(Cell).use(CellGroup).use(Button)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  // 如果 Vue 选项中包含渲染函数，template将被忽略,components可不配置。
  // components: { App },
  // template: '<App/>'
  // template: '<p>213123</p>', 
  // render 函数若存在,则 Vue 构造函数不会从 template 选项或通过 el 选项指定的挂载元素中提取出的 HTML 模板编译渲染函数。
  // render (h) { return h(App) }
  render: h => h(App)
}).$mount('#app')
