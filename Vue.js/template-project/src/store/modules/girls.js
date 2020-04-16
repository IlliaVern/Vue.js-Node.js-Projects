import localDataOperations from '../helpers/localDataOperations'

export default {
    namespaced: true,
    state: {
        girlsList: []
    },

    getters: {
        getGirlsList(state) {
            return state.girlsList
        },
        // getFilteredGirlsList(state) {
        //     return state.girlsList
        // }
    },

    mutations: {
        getGirlsList(state, girls) {
            state.girlList = [...girls]
        },
        // getFilter(state, girls) {
        //     state.filter = {...girls}
        // }
    },

    actions: {
        loadGirlsList({commit}) {
            commit('getGirlsList', localDataOperations.readGirls())
        },
        // addFilter({commit}, filter) {
        //     commit(getFilter), filter
        // },
        addGirl({dispatch}, girl) {
            localDataOperations.addGirl(girl)
            dispatch('loadGirlsList')
        },
        updateGirl({dispatch}, girl){
            localDataOperations.updateGirl(girl)
            dispatch('loadGirlsList')
        },
        deleteGirl({dispatch}, girlId){
            localDataOperations.deleteGirl(girlId)
            dispatch('loadGirlsList')
        },
        getGirlById({dispatch}, girlId){
            localDataOperations.getGirlById(girlId)
            dispatch('loadGirlsList')
        }
    }
}