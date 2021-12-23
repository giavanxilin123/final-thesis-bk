import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import locale from 'element-ui/lib/locale/lang/en'
import * as VueGoogleMaps from "vue2-google-maps";
import VueGtag from "vue-gtag";
import router from './router'
import store from './store'
import App from './App.vue';


Vue.use(ElementUI, { locale })

Vue.use(VueGtag, {
  config: { id: "215635502" }
});

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyAkK1Nj9HWtb4R0crJISga3j9hq2aBC8lQ",
    libraries: "places"
  }
});

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
