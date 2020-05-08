import axios from "axios"
import apiEndpoints from "@/constants/apiEndpoints";

export default {
    namespaced: true,
    state: {
        authenticationData: JSON.parse(localStorage.getItem('authenticationData')) || null,
        expiresAt: localStorage.getItem('expiresAt') || null
    },
    getters: {
        isAuthenticated: state=>()=>{
            return state.authenticationData && new Date().getTime() < state.expiresAt
        },
        getAccessToken: state=>()=>{
            return state.authenticationData && state.authenticationData.access_token
        },
        authorized: state=>state.authenticationData && new Date().getTime() < state.expiresAt
    },
    mutations: {
        setUpAuthenticationData(state, { authenticationData, expiresAt }){
            state.authenticationData = {...authenticationData}
            localStorage.setItem('authenticationData', JSON.stringify(state.authenticationData))
            state.expiresAt = expiresAt || state.authenticationData.expires_in*1000 + new Date().getTime()
            localStorage.setItem('expiresAt', JSON.stringify(state.expiresAt))
        },

        clearAuthenticationData(state){
            state.authenticationData = null
            localStorage.removeItem('authenticationData')
            state.expiresAt = null
            localStorage.removeItem('expiresAt')
        }
    },
    actions: {
        setAuthenticationData({commit},{authenticationData, expiresAt}){
            commit('setUpAuthenticationData', {authenticationData, expiresAt})
        },

        signup({commit},{email, password}){
            return new Promise((resolve, reject)=>{
                axios
                .post(apiEndpoints.user.signup, {email, password})
                .then(function(){
                    // commit('setUpAuthenticationData', { authenticationData: user.data })
                    resolve(true) })
                .catch(err=>{
                    commit('clearAuthenticationData')
                    reject(err)
                })
            })
        },

        login({commit},{email, password}){
            return new Promise((resolve, reject)=>{
                axios
                .post(apiEndpoints.user.login, {email, password})
                .then(res=>res.data)
                .then(data=>{
                    commit('setUpAuthenticationData', {...data.user})
                    resolve(true)
                })
                .catch(err=>{
                    commit('clearAuthenticationData')
                    reject(err)
                })
            })
        },
        logout({commit}) {commit('clearAuthenticationData')}
    }


};