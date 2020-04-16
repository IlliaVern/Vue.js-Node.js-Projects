import Vue from 'vue'
import App from './App.vue'
import firebase from 'firebase';
import store from './store/'

//імпортуємо налаштування firebase
import "./firebase-config";
/* Підключаємо firebase до екземпляра Vue */
Vue.prototype.$firebase = firebase;
store.$firebase = firebase;

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
