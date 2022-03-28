import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.prototype.$apiWeb = axios.create({
    baseURL: 'http://149.91.80.75:19180/',
    params: {},
    withCredentials: true,
})
Vue.prototype.$apiAuth = axios.create({
    baseURL: 'http://149.91.80.75:19480/',
    params: {},
})

Vue.use(VueAxios, axios)
Vue.config.productionTip = false

new Vue({
    router,
    store,
    axios,
    render: function(h) { return h(App) }
}).$mount('#app')