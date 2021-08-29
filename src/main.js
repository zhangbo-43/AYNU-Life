import Vue from 'vue'
import App from './App.vue'
import'./lib/css/mui.css'
// 导入mui拓展包样式
import './lib/css/icons-extra.css'
// 导入 路由处理对象vue-route
import VueRouter from'vue-router'
Vue.use(VueRouter);
//导入 路由模块 router.js
import router from './router'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI);
import axios from 'axios'
Vue.prototype.$http = axios
//导入moment.js
import moment from 'moment'
Vue.filter('dataFormat',function(dataStr,pattern ='YYYY-MM-DD'){
  return moment(dataStr).format(pattern)
})
//导入vue-review
import VuePreview from 'vue-preview';
//注册到Vue身上
Vue.use(VuePreview);
import store from './store';
new Vue({
  el:'#app',
  render: h =>h(App),
  router,
  store,
})
