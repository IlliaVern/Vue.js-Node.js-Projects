import axios from "axios"
import apiEndpoints from "@/constants/apiEndpoints";

export default {
    namespaced: true,
    state: {
        girlsList: [],
        loading: false,
        error: false
    },
    getters: {
        getGirlsList: (state) => state.girlsList,

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
                .put(apiEndpoints.girls.update, girl)
                .then(res=>res.data)
                .then(resData=>{
                    if(resData.success) dispatch("loadGirlsList")
                    else throw new Error("Fetch failed :(")
                })
                .catch(err=>commit("setError", err))
                .finally(()=>commit("setLoading", false))
        },

        findGirlById({dispatch}, girlId){
            let girlsList = dispatch("loadGirlsList")
            return girlsList[girlId]
        }
    }

};