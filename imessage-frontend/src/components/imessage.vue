<template>
  <div class="imessage">
    <Sidebar />
    <Chat />
  </div>
</template>

<script>
import Sidebar from "./Sidebar";
import Chat from './Chat'
export default {
  components: {
    Sidebar,
    Chat
  },
};
</script>

<style>
.imessage {
    display: flex;
}
</style>