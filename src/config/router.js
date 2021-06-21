import Vue from 'vue'
import App from "../App";
import VueRouter from 'vue-router'
import Login from '../components/product design/login'

//Vue组件使用Vue-router组件
Vue.use(VueRouter)

//路由数组
var routes=[{path: "/App",component: App},{path: "/",component: Login}];

//路由管理器
export default new VueRouter({
  routes
});



