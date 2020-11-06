<template>
  <div class="chat">
    <div class="chat__header">
      <h4>
        To:
        <span class="chat__name"> {{ chatName }} </span>
      </h4>
      <strong>Details</strong>
    </div>
    <div class="chat__messages">
      <Flipper :flip-key="key">
        <Flipped v-for="message in state.messages" :key="message.id">
          <message :id="message.id" :data="message.data" />
        </Flipped>
      </Flipper>
    </div>
    <div class="chat__input">
      <form @submit.prevent="sendMessage">
        <input v-model="state.input" placeholder="iMessage" type="text" />
        <button type="submit">Send Message</button>
      </form>
      <md-button class="md-icon-button">
        <md-icon class="chat_mic">mic_none</md-icon>
      </md-button>
    </div>
  </div>
</template>

<script>
import Message from "@/components/Message";
import { computed, reactive, watchEffect } from "@vue/composition-api";
import store from "@/store";
import { Flipper, Flipped } from "vue-flip-toolkit";
import axios from "@/axios";
import Pusher from "pusher-js";
var pusher = new Pusher(process.env.PUSHER_KEY, {
  cluster: process.env.PUSHER_CLUSTER,
});
export default {
  name: "Chat",
  components: { Message, Flipped, Flipper },
  setup() {
    const user = store.getters.user;
    const chatName = computed(() => store.getters.chatName);
    const chatId = computed(() => store.getters.chatId);
    const key = computed(() => state.messages.join(""));
    function sendMessage() {
      axios
        .post(`new/message?id=${chatId.value}`, {
          message: state.input.value,
          timestamp: Date.now(),
          user: user.value,
        })
        .then((res) => {
          console.log(res);
        });
    }

    const state = reactive({
      input: "",
      messages: [],
    });
    function getConversation(chatId) {
      axios.get(`/get/conversation?id=${chatId}`).then((res) => {
        state.messages = res.data[0].conversation;
      });
    }
    watchEffect(() => {
      pusher.unsubscribe("messages");

      getConversation(chatId.value);

      const channel = pusher.subscribe("messages");
      // eslint-disable-next-line no-unused-vars
      channel.bind("newMessage", function (data) {
        getConversation(chatId.value);
      });
    });
    return {
      sendMessage,
      state,
      chatName,
      chatId,
      user,
      key,
      getConversation,
    };
  },
};
</script>

<style>
.chat {
  display: flex;
  flex-direction: column;
  flex: 0.65;
  height: 100vh;
  background-color: white;
}

.chat__header {
  padding: 20px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid lightgray;
  background-color: #f5f5f5;
}

.chat__header > h4 {
  font-weight: 500;
  color: gray;
}

.chat__name {
  color: black;
}

.chat__input {
  display: flex;
  align-items: center;
  padding: 10px 20px;
  border-top: 1px solid lightgray;
  background-color: #f5f5f5;
}

.chat__input > form {
  flex: 1;
}

.chat__messages {
  flex: 1;
  overflow: scroll;
}

/* Hide scrollbar for Chrome, Safari and Opera */
.chat__messages::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.chat__messages {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

.chat__input > form > input {
  width: 98%;
  outline-width: 0;
  border: 1px solid lightgray;
  border-radius: 999px;
  padding: 5px;
}

.chat__input > form > button {
  display: none;
}
</style>