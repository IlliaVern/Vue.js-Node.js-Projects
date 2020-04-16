import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

    const store = new Vuex.Store({
    state: {
        productsList: [],
        loading: false,
        error: null,
    },
    getters: {
        getProductsList: state => state.productsList,
        isLoading: state => state.loading,
        isError: state => state.error
    },
    mutations: {
        setProductsList(state, data) {
            state.productsList = [...data]
        },
        setLoading(state, loadingStatus) {
            state.loading = loadingStatus
        },
        setError(state, error) {
            state.error = error
        }
    },
    actions: {
        
        loadProductsList({commit}) {
            commit('setLoading', true)
            commit('setError', null)

            const db = this.$firebase.firestore();
            db.collection("products")
                .get()
                .then(snap => {
                    if (snap.empty) throw new Error('Empty')
                    const products = [];
                    snap.forEach(doc => {
                        products.push({ id: doc.id, ...doc.data() });
                    });
                    commit('setProductsList', products);
                })
                .catch(
                    (error) => {
                        console.log(error),
                        commit('setError', error)
                    })
                .finally(() => {
                    commit('setLoading', false)
                })
        },
        
        saveProduct({commit, dispatch}, {currentProductId, title, price, img}) 
            {
            commit('setLoading', true)
            commit('setError', null)

            const db = this.$firebase.firestore();
            if (!currentProductId) {
                // Add a new document in collection
                db.collection("products")
                    .doc()
                    .set({ title, price, img})
                    .then(function () {
                        console.log("Document successfully written!");
                        dispatch('loadProductsList')
                    })
                    .catch(function (error) {
                        console.log("Error writing document: ", error);
                        commit('setError', error)
                    })
                    .finally(() => {
                        commit('setLoading', false)
                    })
            } else {
                // Change a document in collection
                db.collection("products")
                    .doc(currentProductId)
                    .set({ title, price, img})
                    .then(function () {
                        console.log("Document successfully written!");
                        dispatch('loadProductsList')
                    })
                    .catch(function (error) {
                        console.error("Error writing document: ", error);
                        commit("setError", error)
                    })
                    .finally(() => {
                        commit("setLoading", false)
                    })
            }
        },

        deleteProduct({commit, dispatch}, {currentProductId}) {
            // Delete a document from collection
            commit('setLoading', true)
            commit('setError', null)

            const db = this.$firebase.firestore();
            db.collection("products")
              .doc(currentProductId)
              .delete()
              .then(function() {
                console.log("Document successfully deleted!");
                dispatch('loadProductsList')
              })
              .catch(function(error) {
                console.error("Error removing document: ", error);
                commit('setError', error)
              })
              .finally(() => {
                commit('setLoading', false)
              })
          },
    }
})

export default store;