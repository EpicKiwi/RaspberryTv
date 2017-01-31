import Vue from 'vue'
import App from '../vue/Monitor.vue'
import VueSocketio from 'vue-socket.io';

Vue.use(VueSocketio, io("http://localhost:8080/monitor"));

new Vue({
  el: '#app',
  render: h => h(App)
})
