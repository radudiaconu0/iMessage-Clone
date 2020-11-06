import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import {user} from '@/store/modules/user'
import {chat} from "@/store/modules/chat";

Vue.use(Vuex)

/* eslint-disable no-new */
const store = new Vuex.Store({
    plugins: [createPersistedState()],
    modules: {
        chat,
        user
    }
})

export default store
