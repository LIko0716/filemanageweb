import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import 'element-ui/lib/theme-chalk/index.css';
import ElementUI from 'element-ui';
import store from './store'
import elTable1 from 'components/elTable'
import ToTop from './plugin' // 引入
import uploader from 'vue-simple-uploader'
Vue.use(uploader)
Vue.use(ToTop) // 添加
//应用插件
Vue.use(ElementUI);
Vue.use(elTable1)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
