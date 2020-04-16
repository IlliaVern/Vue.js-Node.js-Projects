import Vue from 'vue'
import App from './App.vue'

import firebase from 'firebase';
import store from './store'

import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
//Імпортуємо екзепляр роутера
import router from './router'

//імпортуємо налаштування firebase
import "./firebase-config";                     //<------
/* Підключаємо firebase до екземпляра Vue */
Vue.prototype.$firebase = firebase;             //<------


Vue.use(Buefy)

Vue.config.productionTip = false

new Vue({
  store,
  router, //Підключаємо роутер до Vue
  render: h => h(App),
}).$mount('#app')
