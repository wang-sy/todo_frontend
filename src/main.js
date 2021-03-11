import Vue from 'vue'
import App from './App.vue'

// 引入ViewUI
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
Vue.use(ViewUI);

// 引入VueRouter, 引入配置，在最终进行添加
import router from "./router/index"

Vue.config.productionTip = false
Vue.prototype.$eventBus = new Vue()

new Vue({
    render: h => h(App),
    router
}).$mount('#app')