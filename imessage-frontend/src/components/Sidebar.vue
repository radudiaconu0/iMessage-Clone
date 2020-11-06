<template>
  <div class="sidebar">
    <div class="sidebar__header">
      <md-avatar class="md-avatar-icon">
        <img @click="signOut" :src="user.photo" alt="Avatar" />
      </md-avatar>
      <div class="sidebar__input">
        <md-icon>search</md-icon>
        <input type="text" placeholder="Search" />
      </div>
      <md-button @click="addChat" class="sidebar__inputButton md-icon-button">
        <md-icon>rate_review</md-icon>
      </md-button>
    </div>
    <div class="sidebar__chats">
      <div v-for="chat in state.chats" :key="chat.id">
        <SidebarChat :chat-name="chat.name" :id="chat.id" />
      </div>
    </div>
  </div>
</template>

<script>
import SidebarChat from "./SidebarChat";
import Pusher from "pusher-js";
import store from "@/store";
import { auth } from "@/firebase";
import { reactive, watchEffect } from "@vue/composition-api";
import axios from "@/axios";
var pusher = new Pusher("79ca682de0abbb98912c", {
  cluster: "eu",
});
export default {
  name: "Sidebar",
  components: { SidebarChat },
  setup() {
    const user = store.getters.user;
    const state = reactive({
      chats: [],
    });
    const getChats = () => {
      axios.get("/get/conversationList").then((res) => {
        state.chats.value = res.data;
        console.log(state.chats)
      });
    };
    watchEffect(() => {
      getChats();

      const channel = pusher.subscribe("chats");
      // eslint-disable-next-line no-unused-vars
      channel.bind("newChat", function (data) {
        getChats();
      });
    });

    function signOut() {
      return auth.signOut();
    }

    const addChat = (e) => {
      e.preventDefault();

      const chatName = prompt("Please enter a chat name");
      const firstMsg = prompt("Please send a welcome message");

      if (chatName && firstMsg) {
        let chatId = "";

        axios
          .post("/new/conversation", {
            chatName: chatName,
          })
          .then((res) => {
            chatId = res.data._id;
          })
          .then(() => {
            axios.post(`/new/message?id=${chatId}`, {
              message: firstMsg,
              timestamp: Date.now(),
              user: user,
            });
          });
      }
    };

    return {
      signOut,
      user,
      state,
      addChat,
      getChats,
    };
  },
};
</script>

<style>
.sidebar {
  flex: 0.35;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f5f5f5;
  border-right: 1px solid lightgray;
}

.sidebar__header {
  display: flex;
  align-items: center;
  padding: 10px;
  height: 50px;
}

.sidebar__avatar {
  cursor: pointer;
  margin: 10px;
}

.sidebar__input {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  background-color: #e1e1e1;
  color: gray;
  border-radius: 5px;
}

.sidebar__input > input {
  border: none;
  background: transparent;
  outline-width: 0;
}

.sidebar__chats {
  overflow: scroll;
}

/* Hide scrollbar for Chrome, Safari and Opera */
.sidebar__chats::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.sidebar__chats {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
</style>