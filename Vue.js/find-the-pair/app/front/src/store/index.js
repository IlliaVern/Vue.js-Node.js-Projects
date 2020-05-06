import Vue from 'vue'
import Vuex from 'vuex'
import girls from './modules/girls'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {},
    getters: {},
    mutations: {},
    actions: {},
    modules: {
        girls
    }
})

export default store