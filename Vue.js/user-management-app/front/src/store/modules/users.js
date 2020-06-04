import axios from 'axios'
import apiEndpoints from '@/constants/apiEndpoints'

export default {
    namespaced: true,
    state: {
        usersList: [],
        userToUpdate: {},
        loading: false
    },
    getters: {
        getUsersList: (state) => state.usersList,
        getUserToUpdate: (state) => state.userToUpdate,
        isLoading: (state) => state.loading
    },
    mutations: {
        setUsersList: (state, data) => state.usersList = [...data],
        addUserToList: (state, user) => state.usersList.push(user),
        setUserToUpdate: (state, data) => state.userToUpdate = {...data},
        setLoading: (state, data) => state.loading = data
    },
    actions: {
        loadUsersList({commit}){
            commit("setLoading", true)
            axios 
                .get(apiEndpoints.users.read)
                .then((res)=>res.data)
                .then((resData)=>{
                    if(resData.success) commit("setUsersList", resData.data)
                    else throw new Error("Fetch failed :(")
                })
                .catch((err)=>console.log(err))
                .finally(()=>commit("setLoading", false))
        },

        addUser({commit}, user){
            commit("setLoading", true)
            axios
                .post(apiEndpoints.users.add, user)
                .then((res)=>res.data)
                .then((resData)=>{
                    if(resData.success) commit("addUserToList", resData.data)
                    else throw new Error("Fetch failed :(")
                })
                .catch((err)=>console.log(err))
                .finally(()=>commit("setLoading", false))
        },

        deleteUser({commit, dispatch}, id){
            commit("setLoading", true)
            axios
                .delete(apiEndpoints.users.delete, {data:{id}})
                .then((res)=>res.data)
                .then((resData)=>{
                    if(resData.success) dispatch("loadUsersList")
                    else throw new Error("Fetch failed :(")
                })
                .catch((err)=>console.log(err))
                .finally(()=>commit("setLoading", false))
        },

        updateUser({commit, dispatch}, user){
            commit("setLoading", true)
            axios
                .put(apiEndpoints.users.update(user._id), user)
                .then(res=>res.data)
                .then(resData=>{
                    if(resData.success) dispatch("loadUsersList")
                    else throw new Error("Fetch failed :(")
                })
                .catch(err=>console.log(err))
                .finally(()=>commit("setLoading", false))
        },

        findUserById({commit}, userId){
            commit("setLoading", true)
             axios
                .get(apiEndpoints.users.findById(userId))
                .then(res=>res.data)
                .then (resData=>{
                    if(resData.success) commit("setUserToUpdate", resData.data)
                    else throw new Error("Fetch failed :(")
                })
                .catch(err=>console.log(err))
                .finally(()=>commit("setLoading", false))
        }
    }

}