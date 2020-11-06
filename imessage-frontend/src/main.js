import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import VueCompositionAPI from '@vue/composition-api'
import './assets/index.css'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'

Vue.use(VueMaterial)
Vue.use(VueCompositionAPI)
Vue.config.productionTip = false

new Vue({
    store,
    router,
    render: h => h(App)
}).$mount('#app')
