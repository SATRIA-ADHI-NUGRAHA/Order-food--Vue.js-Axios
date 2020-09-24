import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './assets/css/style.css'
import store from './store'

import axios from 'axios'

axios.defaults.headers = {
  token: localStorage.getItem('token')
}

// axios.interceptors.response.use((response) => {
//   return response
// }, (err) => {
//   console.log(err)
//   const status = err.response.status
//   if (status === 334) {
//     // refres token
//   } else {
//     window.location = '/login'
//   }
// })

Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
