import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router.js';
import { fabric } from 'fabric'

Vue.config.productionTip = false

const changeFavicon = link => {
  let $favicon = document.querySelector('link[rel="icon"]')
  if ($favicon !== null) {
    $favicon.href = link
  } else {
    $favicon = document.createElement("link")
    $favicon.rel = "icon"
    $favicon.href = link
    document.head.appendChild($favicon)
  }
}

const DEFAULT_TITLE = 'Decabits LogoMaker';
router.afterEach(() => {
    Vue.nextTick(() => {
        document.title =  DEFAULT_TITLE;
        changeFavicon(require("../public/favicon1.png"))
    });
});


new Vue({
  fabric,
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
