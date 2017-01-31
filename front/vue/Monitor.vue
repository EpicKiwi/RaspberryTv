<template>
<div id="app">
  <background></background>
  <status message-type="loading" v-show="!socketConnected"></status>
  <div class="content">
    <clock></clock>
  </div>
</div>
</template>

<script>
import clock from "./Clock.vue"
import status from "./Status.vue"
import background from "./Background.vue"

export default {
  name: 'app',
  data() {return{
    socketConnected: false
  }},
  components : {
  	clock,
    status,
    background
  },
  sockets: {
    connect () {
      this.socketConnected = true;
      console.info("Socket connected");
    }
  }
}
</script>

<style>
@import "../css/reset.css";
@import "../css/fonts.css";

#app{
  background-color: black;
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  font-family: "Open Sans", sans-serif;
  color: rgba(255,255,255,0.8);
}

.content {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
