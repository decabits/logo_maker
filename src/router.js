import Vue from 'vue'
import VueRouter from 'vue-router'
import BrandName from './components/BrandName/BrandName'

Vue.use(VueRouter);

const routes = [
    { path: '/', component: BrandName }
]

export default new VueRouter({
    routes
})
  