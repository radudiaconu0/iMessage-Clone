<template>
  <div class="login">
    <div class="login__logo">
      <img src='../assets/logo.png'>
      <h1>iMessage</h1>
      <md-button @click="signIn" class="btn">Sign In</md-button>
    </div>
  </div>
</template>

<script>

import {auth, provider} from "@/firebase";
import { defineComponent } from "@vue/composition-api";

export default defineComponent({
  name: "Login",
  methods: {
    signIn() {
      auth.signInWithPopup(provider)
          .catch(error => alert(error.message))
    }
  }
})
</script>

<style>
.login {
  display: grid;
  place-items: center;
  height: 100vh;
  width: 100%;
}

.login > div > img {
  object-fit: contain;
  height: 150px;
}

.login > button {
  width: 300px;
  background-color: #3ea4fb;
  color: #eff2f5;
  font-weight: 800;
}

.login > button:hover {
  background-color: gainsboro;
  color: #3ea4fb;
}

</style>