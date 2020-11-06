export const user = {
    state: {
        user: null
    },
    mutations: {
        login(state, user) {
            state.user = user;
        },
        logout(state) {
            state.user = null
        }
    },
    actions: {
        login({commit}, payload) {
            commit('login', payload)
        },
        logout({commit}) {
            commit('logout')
        }
    },
    getters: {
        user: (state) => state.user
    }
}