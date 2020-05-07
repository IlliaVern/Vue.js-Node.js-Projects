import axios from "axios"
import apiEndpoints from "@/constants/apiEndpoints";

export default {
    namespaced: true,
    state: {
        girlsList: [],
        girlToUpdate: {},
        loading: false,
        error: false
    },
    getters: {
        getGirlsList: (state) => state.girlsList,
        getGirlToUpdate: (state) => state.girlToUpdate,
        isLoading: (state) => state.loading,
        isError: (state) => state.error
    },
    mutations: {
        setGirlsList(state, data) {
            state.girlsList = [...data]
        },
        addGirlToList(state, girl) {
            state.girlsList.push(girl)
        },
        setGirlToUpdate(state, data) {
            state.girlToUpdate = {...data}
        },
        setLoading(state, data) {
            state.loading = data
        },
        setError(state, data) {
            state.error = data
        }
    },
    actions: {
        loadGirlsList({commit}){
            commit("setLoading", true)
            commit("setError", null)

            axios 
                .get(apiEndpoints.girls.read)
                .then((res)=>res.data)
                .then((resData)=>{
                    if (resData.success) commit("setGirlsList", resData.data)
                    else throw new Error("Fetch failed :(")
                })
                .catch((err)=>commit("setError", err))
                .finally(()=>commit("setLoading", false))
        },

        addGirl({commit}, girl){
            commit("setLoading", true)
            commit("setError", null)

            axios
                .post(apiEndpoints.girls.add, girl)
                .then((res)=>res.data)
                .then((resData)=>{
                    if(resData.success) commit("addGirlToList", resData.data)
                    else throw new Error("Fetch failed :(")
                })
                .catch((err)=>commit("setError", err))
                .finally(()=>commit("setLoading", false))
        },

        deleteGirl({commit, dispatch}, id){
            commit("setLoading", true)
            commit("setError", null)

            axios
                .delete(apiEndpoints.girls.delete, {data:{id}})
                .then((res)=>res.data)
                .then((resData)=>{
                    if(resData.success) dispatch("loadGirlsList")
                    else throw new Error("Fetch failed :(")
                })
                .catch((err)=>commit("setError", err))
                .finally(()=>commit("setLoading", false))
        },

        updateGirl({commit, dispatch}, girl){
            commit("setLoading", true)
            commit("setError", null)

            axios
                .put(apiEndpoints.girls.update(girl._id), girl)
                .then(res=>res.data)
                .then(resData=>{
                    if(resData.success) dispatch("loadGirlsList")
                    else throw new Error("Fetch failed :(")
                })
                .catch(err=>commit("setError", err))
                .finally(()=>commit("setLoading", false))
        },

        findGirlById({commit}, girlId){
            commit("setLoading", true)
            commit("setError", null)

             axios
                .get(apiEndpoints.girls.findById(girlId))
                .then(res=>res.data)
                .then (resData=>{
                    if(resData.success) commit("setGirlToUpdate", resData.data)
                    else throw new Error("Fetch failed :(")
                })
                .catch(err=>commit("setError", err))
                .finally(()=>commit("setLoading", false))
        },
    }

};