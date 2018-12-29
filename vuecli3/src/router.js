import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// 路由懒加载
// 主模块页Layout是所有主模块页面的布局父路由
const Layout = () => import("@/views/main/layout/layout.vue")

// 活动页Layout是所有活动页面的布局父路由 路由的name属性值要保持唯一
const Layout2 = () => import("@/views/act/layout/layout.vue") 

// 测试路由
// const testRouter = {
//   path: '/test',
//   name: 'test',
//   component: Layout2,
//   redirect: '/test/test',
//   children: [
//     { path: 'test', name: 'test', meta: { title: 'test', bg: '#39b5a0'}, component: () => import("@/views/test/test.vue") },
//     { path: 'test1', name: 'test1', meta: { title: 'test1', bg: '#39b5a0'}, component: () => import("@/views/test/test1.vue") },
//     { path: 'canva', name: 'canva', meta: { title: 'canva', bg: '#39b5a0'}, component: () => import("@/views/test/canva.vue") },
//     { path: 'es6', name: 'es6', meta: { title: 'es6', bg: '#39b5a0'}, component: () => import("@/views/test/es6.vue") },
//     { path: 'vue', name: 'vue', meta: { title: 'vue', bg: '#39b5a0'}, component: () => import("@/views/test/vue.vue") },
//   ]
// }

// 内购会
const nghRouter = {
  path: '/ngh',
  name: 'ngh',
  component: Layout2,
  redirect: '/ngh/home',
  children: [
    { path: 'login', name: 'login', meta: { title: '全棉时代内购会入场' }, component: () => import("@/views/act/ngh/login.vue") },
    { path: 'home', name: 'home', meta: { title: '员工内购会主会场', keepAlive: true }, component: () => import("@/views/act/ngh/home.vue") },
    { path: 'venue', name: 'venue', meta: { title: '员工内购会分会场', bg: '#eee' }, component: () => import("@/views/act/ngh/venue.vue") },
    { path: 'assist', name: 'assist', meta: { title: '提额助力', keepAlive: true }, component: () => import("@/views/act/ngh/assist.vue") },
  ]
}
// push和replace区别是，replace不会向 history 添加新记录，导致无法返回上一页
const router = new Router({
  // m端用hash模式 app用history模式
  // mode: 'history', // 后端支持可开  base配置对应nginx的location是否有新目录
  routes: [
    // cpnRouter,
    nghRouter,
    // testRouter,
    // htmRouter,
    // mainRouter,
    // ...baseRouter,
  ],
  // scrollBehavior只在history和hash模式都有效 
  // 注意: 这个功能只在支持 history.pushState 的浏览器中可用。
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) { // 如果savedPosition存在，滚动条会自动跳到记录的值的地方
      return savedPosition
    } else {
      return { x: 0, y: 0 } // savedPosition也是一个记录x轴和y轴位置的对象
    }
  },
})

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

router.afterEach((to) => {
  // console.log(location.href)
})

// export default 可以在其他js直接引用 但export需要{}进行引用 
export default router