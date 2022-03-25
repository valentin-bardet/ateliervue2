import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.prototype.$apiWeb = axios.create({

    baseURL: 'http://api.reunionou.app:19180/',
    params: {},
    headers: { "X-Requested-With": "XMLHttpRequest", }
})
Vue.use(VueAxios, axios)
Vue.config.productionTip = false

new Vue({
    router,
    store,
    axios,
    render: function(h) { return h(App) }
}).$mount('#app')