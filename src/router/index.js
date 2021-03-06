import Vue from 'vue'
import VueRouter from 'vue-router'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'

Vue.use(Buefy)
Vue.use(VueRouter)

const routes = [{
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: function() {
            return import ( /* webpackChunkName: "about" */ '../views/About.vue')
        }
    },
    {
        path: '/mypage',
        name: 'Mypage',
        component: function() {
            return import ( /* webpackChunkName: "about" */ '../views/MyPage.vue')
        }
    },

    {
        path: '/userProfil',
        name: 'UserProfil',
        component: function() {
            return import ( /* webpackChunkName: "about" */ '../views/UserProfil.vue')
        }
    },
    {
        path: '/login',
        name: 'Login',
        component: function() {
            return import ( /* webpackChunkName: "about" */ '../views/Login.vue')
        }
    },
    {
        path: '/register',
        name: 'Register',
        component: function() {
            return import ( /* webpackChunkName: "about" */ '../views/Register.vue')
        }
    },
    {
        path: '/MesEventsCrees',
        name: 'MesEventsCrees',
        component: function() {
            return import ( /* webpackChunkName: "about" */ '../views/MesEventsCrees.vue')
        }
    },
    {
        path: '/MyEvents',
        name: 'MyEvents',
        component: function() {
            return import ( /* webpackChunkName: "about" */ '../views/MyEvents.vue')
        }
    },
    {
        path: '/invits',
        name: 'MesInvits',
        component: function() {
            return import ( /* webpackChunkName: "about" */ '../views/MesInvits.vue')
        }
    },
    {
        path: '/CreateEvent',
        name: 'CreateEvent',
        component: function() {
            return import ( /* webpackChunkName: "about" */ '../views/CreateEvent.vue')
        }
    },
    {
        path: '/Myevent/:idevent',
        name: 'Myevent',

        component: () =>
            import ('../views/Myevent.vue')
    },
    {
        path: '/Event/:idevent',
        name: 'Event',

        component: () =>
            import ('../views/Event.vue')
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router