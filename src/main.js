import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router.js';
import { fabric } from 'fabric'

Vue.config.productionTip = false

new Vue({
  fabric,
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
