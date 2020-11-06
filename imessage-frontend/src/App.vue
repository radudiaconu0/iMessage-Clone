<template>
  <div class="app">
    <imessage v-if="user !== null"/>
    <Login v-else/>
  </div>
</template>

<script>
import imessage from "./components/imessage";
import store from "@/store";
import Login from "@/components/Login";
import {auth} from "@/firebase";
import {computed, watchEffect, onMounted} from '@vue/composition-api'

export default {
  name: "App",
  components: {
    Login,
    imessage,
  },
  setup() {

    const user = computed(() => store.getters.user);
    onMounted(() => console.log(store.getters.user))
    watchEffect(() => {
      auth.onAuthStateChanged(authUser => {
        if (authUser) {
          console.log(authUser)
          store.dispatch('login', {
            uid: authUser.uid,
            photo: authUser.photoURL,
            email: authUser.email,
            displayName: authUser.displayName
          })
        } else {
          store.dispatch('logout')
        }
      })
    })
    return {
      user
    }
  },
}
</script>

<style scoped>

</style>
