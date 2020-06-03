import axios from 'axios'
import apiEndpoints from '@/constants/apiEndpoints'

export default {
    namespaced: true,
    state: {
        usersList: [],
        userToUpdate: {},

    },
    getters: {
        getUsersList: (state) => state.usersList,
        getUserToUpdate: (state) => state.userToUpdate,

    },
    mutations: {
        setUsersList: (state, data) => state.usersList = [...data],
        addUserToList: (state, user) => state.usersList.push(user),
        setUserToUpdate: (state, data) => state.userToUpdate = {...data},

    },
    actions: {
        loadUsersList({commit}){
            // commit("setLoading", true)
            // commit("setError", null)

            axios 
                .get(apiEndpoints.users.read)
                .then((res)=>res.data)
                .then((resData)=>{
                    resData.success ? commit("setUsersList", resData.data)
                    : new Error( "Fetch failed :(" )
                    // if(resData.success) commit("setUsersList", resData.data)
                    // else throw new Error("Fetch failed :(")
                })
                .catch((err)=>console.log(err))
                // .catch((err)=>commit("setError", err))
                // .finally(()=>commit("setLoading", false))
        },

        addUser({commit}, user){
            // commit("setLoading", true)
            // commit("setError", null)

            axios
                .post(apiEndpoints.users.add, user)
                .then((res)=>res.data)
                .then((resData)=>{
                    resData.success ? commit("addUserToList", resData.data)
                    : new Error("Fetch failed :(")
                    // if(resData.success) commit("addUserToList", resData.data)
                    // else throw new Error("Fetch failed :(")
                })
                .catch((err)=>console.log(err))
                // .finally(()=>commit("setLoading", false))
        },

        deleteUser({commit, dispatch}, id){
            commit("setLoading", true)
            commit("setError", null)

            axios
                // .delete(apiEndpoints.users.delete(user._id))
                .delete(apiEndpoints.users.delete, {data:{id}})
                .then((res)=>res.data)
                .then((resData)=>{
                    resData.success ? dispatch("loadGirlsList")
                    : new Error("Fetch failed :(")
                    // if(resData.success) dispatch("loadGirlsList")
                    // else throw new Error("Fetch failed :(")
                })
                .catch((err)=>console.log(err))
                // .finally(()=>commit("setLoading", false))
        },

        // updateUser({commit, dispatch}, user){
        updateUser({dispatch}, user){

            // commit("setLoading", true)
            // commit("setError", null)

            axios
                .put(apiEndpoints.users.update(user._id), user)
                .then(res=>res.data)
                .then(resData=>{
                    resData.success ? dispatch("loadGirlsList")
                    : new Error("Fetch failed :(")
                    // if(resData.success) dispatch("loadGirlsList")
                    // else throw new Error("Fetch failed :(")
                })
                .catch(err=>console.log(err))
                // .finally(()=>commit("setLoading", false))
        },

        findUserById({commit}, userId){
            // commit("setLoading", true)
            // commit("setError", null)

             axios
                .get(apiEndpoints.users.findById(userId))
                .then(res=>res.data)
                .then (resData=>{
                    // if(resData.success) commit("setGirlToUpdate", resData.data)
                    // else throw new Error("Fetch failed :(")
                    resData.success ? commit("setGirlToUpdate", resData.data)
                    : new Error("Fetch failed :(")
                })
                .catch(err=>console.log(err))
                // .finally(()=>commit("setLoading", false))
        }
    }

}