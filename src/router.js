import Vue from 'vue'
import VueRouter from 'vue-router'
import CreateLogo from './components/CreateLogo/index'
import Form from './components/CreateLogo/Form/index'
import EditLogo from './components/CreateLogo/EditLogo'

Vue.use(VueRouter);

const routes = [
    { 
        path: '/', 
        component: EditLogo 
    },
    { 
        path: '/form', 
        component: Form 
    },
    { 
        path: '/logo-maker', 
        component: CreateLogo 
    }
]

export default new VueRouter({
    base: '/app/',
    routes
})
