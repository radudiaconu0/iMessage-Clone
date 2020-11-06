<template>
  <div
    :class="user.email === data.email ? 'message message__sender' : 'message'"
  >
    <md-avatar class="message__photo">
      <img :src="data.photo" />
    </md-avatar>
    <p>{{ data.message }}</p>
    <small>{{
      new Date(data.timestamp ? data.timestamp.toDate() : null).toLocaleString()
    }}</small>
  </div>
</template>

<script>
import store from "@/store";
import { defineComponent } from "@vue/composition-api";
export default defineComponent({
  name: "Message",
  props: {
    id: {
      required: true,
    },
    data: {
      required: true,
    },
  },
  setup() {
    const user = store.getters.user;
    return {
      user,
    };
  },
});
</script>

<style>
.message {
  display: flex;
  align-items: center;
  position: relative;
  width: fit-content;
  justify-content: space-between;
  margin: 15px;
}

.message > p {
  background-color: #f3f3f5;
  font-size: medium;
  padding: 15px;
  border-radius: 20px;
  margin: 10px;
  margin-right: auto;
}

.message > small {
  color: gray;
  position: absolute;
  font-size: 8px;
  bottom: -5px;
  right: 0;
}

.message__sender {
  margin-left: auto;
}

.message__sender > .message__photo {
  order: 1;
  margin: 15px;
}

.message__photo {
  order: 0;
}

.message__sender > p {
  background-color: #3cabfa;
  color: white;
}
</style>