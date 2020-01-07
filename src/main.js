import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
//import App from './App.vue'
import Test from './Test.vue'
import axios from 'axios'
Vue.prototype.$http = axios
axios.defaults.baseURL = '/api'  //关键代码
Vue.config.productionTip = false

Vue.use(ElementUI)

new Vue({
  el: '#app',
  render: h => h(Test)
})
