import Vue from 'vue'
import App from './App.vue'
import store from "./store";
import axios from "axios"

import Buefy from 'buefy'
import 'buefy/dist/buefy.css'

//Імпортуємо роутер
import router from './router'

Vue.use(Buefy)
Vue.config.productionTip = false

//---Automatically call before each request---
axios.interceptors.request.use(function (config) {
  const isAuthenticated = store.getters["authorization/isAuthenticated"]();
  if (isAuthenticated) {
    config.headers["Authorization"] =
      "Bearer " + store.getters["authorization/getAccessToken"]();
  } else {
    config.headers["Authorization"] = null;
  }
  return config;
});

//---Automatically call after each request---

axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function(error) {
    if (error.response.status === 401) {      // Якщо сервер відповів «401»
      router.push({ path: "/login" });
    }
    return Promise.reject(error);
  }
);

//---Protect routes from unauthorised access---

router.beforeEach((to, from, next) => {
  let check = !store.getters["authorization/isAuthenticated"]() &&
    !["/login", "/signup"].includes(to.path);

  if (check) { // Недопускаємо до захищених роутів, якщо немає токена
    next({path: "/login"});
    return;
  } else {
    next();
  }
});

new Vue({
  store,
  router, //Підключаємо роутер до Vue
  render: h => h(App),
}).$mount('#app')