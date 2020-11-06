<template>
  <div @click="setChat" class="sidebarChat">
    <md-avatar class="md-avatar-icon">
      <md-icon v-if="!state.chatInfo[0]">person</md-icon>
      <img v-else :src="state.chatInfo[0].photo" />
    </md-avatar>
    <div class="sidebarChat__info">
      <h3>{{ chatName }}</h3>
      <p>{{ state.chatInfo[0] ? state.chatInfo[0].message : "" }}</p>
      <small>{{
        state.chatInfo[0]
          ? state.chatInfo[0].timestamp
            ? new Date(state.chatInfo[0].timestamp.toDate()).toLocaleString()
            : ""
          : ""
      }}</small>
    </div>
  </div>
</template>

<script>
import store from "@/store";
import { reactive, watchEffect } from "@vue/composition-api";
import axios from "@/axios";
import Pusher from "pusher-js";
var pusher = new Pusher("79ca682de0abbb98912c", {
  cluster: "eu",
});
export default {
  name: "SidebarChat",
  props: ["chatName", "id"],
  setup(props) {
    const getSidebarElement = () => {
      axios.get(`/get/lastMessage?id=${props.id}`).then((res) => {
        (state.lastMsg.value = res.data.message),
          (state.lastPhoto.value = res.data.user.photo),
          (state.lastTimestamp.value = res.data.timestamp);
      });
    };
    watchEffect(() => {
      getSidebarElement();
      const channel = pusher.subscribe("messages");
      // eslint-disable-next-line no-unused-vars
      channel.bind("newMessage", function (data) {
        getSidebarElement();
      });
      //realtime
    });
    const state = reactive({
      chatInfo: [],
      lastMsg: "",
      lastPhoto: "",
      lastTimestamp: "",
    });

    function setChat() {
      store.dispatch("setChat", {
        chatId: props.id,
        chatName: props.chatName,
      });
    }

    return {
      setChat,
      state,
      getSidebarElement,
    };
  },
};
</script>

<style>
.sidebarChat {
  display: flex;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid lightgray;
  cursor: pointer;
}

.sidebarChat:hover {
  background-color: #3e93fd;
  color: white;
}

.sidebarChat__info {
  margin-left: 15px;
  position: relative;
  width: 100%;
}

.sidebarChat__info > small {
  position: absolute;
  top: 5px;
  right: 0;
}
</style>