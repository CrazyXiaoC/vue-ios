import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// element ui
//import ElementUI from 'element-ui'
//import 'element-ui/lib/theme-chalk/index.css'
//Vue.use(ElementUI)

// message component
import Message from './components/message/message.js'


Vue.prototype.$message = Message

// svg-icon
import './icons'

// 引入echarts
import echarts from 'echarts'
Vue.prototype.$echarts = echarts

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
