import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './components/Home/index'
import LogoMaker from './components/LogoMaker/index'
import BrandName from './components/LogoMaker/BrandName/index'

Vue.use(VueRouter);

const routes = [
    { 
        path: '/', 
        component: Home
    },
    { 
        path: '/company-name', 
        component: BrandName 
    },
    { 
        path: '/logo-maker', 
        component: LogoMaker 
    }
]

export default new VueRouter({
    routes
})
  