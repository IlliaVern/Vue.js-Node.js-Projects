import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/pages/Home';
import GirlsViewer from '@/pages/GirlsViewer';
import GirlEditor from '@/pages/GirlEditor';
import Login from "@/pages/Authorization/Login.vue"
import Signup from "@/pages/Authorization/Signup.vue"


Vue.use(VueRouter)

const routes = [
    { path: '/', component: Home },
    { path: '/girls', component: GirlsViewer },
    { path: '/girls/add', component: GirlEditor },
    { path: '/girls/edit/:girlId', component: GirlEditor },
    { path: '/login', component: Login },
    { path: '/signup', component: Signup },
  ]

  const router = new VueRouter({
      mode: "history",
      routes // сокращённая запись для `routes: routes`
  })

  export default router


