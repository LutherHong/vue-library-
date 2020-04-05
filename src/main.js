// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'         // vue 模块在 node_modules 中
import App from './App'       // App 即 App.vue 里定义的组件
import router from './router' // router 即 router 文件夹里定义的路由
import store from './store'
// eeeee引入Element
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 设置反向代理，前端请求默认发送到 http://localhost:8443/api
var axios = require('axios')
axios.defaults.baseURL = 'http://localhost:8443/api'
axios.defaults.withCredentials = true
// 全局注册，之后可在其他组件中通过 this.$axios 发送数据
Vue.prototype.$axios = axios

Vue.config.productionTip = false //作用是阻止vue 在启动时生成生产提示。

Vue.use(ElementUI)

router.beforeEach((to,from,next)=>{
  if(to.meta.requireAuth){
    if(store.state.user) {
      axios.get('/authentication').then(resp => {
        if (resp) next()
      })
    }else{
      next({
        path:'login',
        query:{redirect: to.fullPath}
      })
    }
  }else{
    next()
  }
})

/* eslint-disable no-new */
new Vue({                   // 创建了一个 Vue 对象（实例）
  el: '#app',               // el 属性提供一个在页面上已存在的 DOM 元素作为 Vue 对象的挂载目标
  router,                   // router 代表该对象包含 Vue Router，并使用项目中定义的路由。
  // 注意这里
  store,
  components: { App },      // components 表示该对象包含的 Vue 组件
  template: '<App/>'        // template 是用一个字符串模板作为 Vue 实例的标识使用，类似于定义一个 html 标签。
})
