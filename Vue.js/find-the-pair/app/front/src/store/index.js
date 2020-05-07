import Vue from 'vue'
import Vuex from 'vuex'
import girls from './modules/girls'
import authorization from './modules/authorization'


Vue.use(Vuex)

const store = new Vuex.Store({
    state: {},
    getters: {},
    mutations: {},
    actions: {},
    modules: {
        girls,
        authorization
    }
})

export default store