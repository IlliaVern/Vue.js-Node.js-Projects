import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/pages/Home';
import GirlsViewer from '@/pages/GirlsViewer';
import GirlEditor from '@/pages/GirlEditor';

Vue.use(VueRouter)

const routes = [
    { path: '/', component: Home },
    { path: '/all', component: GirlsViewer },
    { path: '/add', component: GirlEditor },
    { path: '/edit/:girlId', component: GirlEditor },

  ]

  const router = new VueRouter({
      mode: "history",
      routes // сокращённая запись для `routes: routes`
  })

  export default router


