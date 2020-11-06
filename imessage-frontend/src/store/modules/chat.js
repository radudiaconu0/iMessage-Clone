export const chat = {
    state: {
        chatId: null,
        chatName: null,
    },
    mutations: {
        setChat(state, payload) {
            state.chatId = payload.chatId;
            state.chatName = payload.chatName
        },
    },
    actions: {
        setChat({ commit }, payload) {
            commit('setChat', payload)
        },
    },
    getters: {
        chatName: (state) => state.chatName,
        chatId: (state) => state.chatId
    }
}