import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/pages/Home'
import UsersViewer from '@/pages/UsersViewer'
import UserEditor from '@/pages/UserEditor'

Vue.use(VueRouter)

const routes  = [
    {path: '/', component: Home},
    {path: '/users', component: UsersViewer},
    {path: '/users/add', component: UserEditor},
    {path: '/users/:userId', component: UserEditor}
]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router