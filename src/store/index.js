import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

const vuexLocal = new VuexPersistence({
    storage: window.localStorage
})
Vue.use(Vuex)

export default new Vuex.Store({
    plugins: [new VuexPersistence().plugin],
    state: {
        token: false,
    },
    mutations: {
        setToken(state, token) {
            state.token = token;
        },
    },
    actions: {},
    modules: {}
})