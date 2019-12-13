import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './components/Home/index'
import CreateLogo from './components/CreateLogo/index'
import Form from './components/CreateLogo/Form/index'

Vue.use(VueRouter);

const routes = [
    { 
        path: '/', 
        component: Home
    },
    { 
        path: '/company-name', 
        component: Form 
    },
    { 
        path: '/logo-maker', 
        component: CreateLogo 
    }
]

export default new VueRouter({
    routes
})
  