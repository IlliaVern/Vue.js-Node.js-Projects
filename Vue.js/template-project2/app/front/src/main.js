import Vue from 'vue'
import App from './App.vue'
import store from "./store";

import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
//Імпортуємо екзепляр роутера
import router from './router'

Vue.use(Buefy)

Vue.config.productionTip = false

new Vue({
  store,
  router, //Підключаємо роутер до Vue
  render: h => h(App),
}).$mount('#app')
