import Vue from 'vue'
import App from './App.vue'

import 'element-ui/lib/theme-chalk/index.css'
import EelementUi from "element-ui"
import VueRouter from './config/router'
import App2 from "./App2";
Vue.use(EelementUi)

import Axios from 'axios'

//设置baseUrl   指定为后端的访问路径
Axios.defaults.baseURL="http://localhost:8888";

Vue.prototype.$axios = Axios;

new Vue({
  el: '#app',
  render: h => h(App),
  router:VueRouter
})

