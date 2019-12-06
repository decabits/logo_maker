import Vue from 'vue'
import VueRouter from 'vue-router'
import HelloWorld from './components/HelloWorld'
import LogoMaker from './components/LogoMaker/LogoMaker'
import BrandName from './components/LogoMaker/BrandName/BrandName'

Vue.use(VueRouter);

const routes = [
    { path: '/', component: HelloWorld },
    { path: '/company-name', component: BrandName },
    { path: '/logo-maker', component: LogoMaker }
]

export default new VueRouter({
    routes
})
  