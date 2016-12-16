<template>
<div id="app">
  <div class="content">
    <clock></clock>
  </div>
</div>
</template>

<script>
import clock from "./Clock.vue"

export default {
  name: 'app',
  data() {return{
    message: 'Bonjour webpack !'
  }},
  components : {
  	"clock": clock
  },
  methods : {
  	change () {
  		this.message = "Bonjour Baptiste !"
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
