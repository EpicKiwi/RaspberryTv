import Vue from 'vue'
import App from '../vue/Medias.vue'
import VueSocketio from 'vue-socket.io';

Vue.use(VueSocketio, io("http://localhost:8080/medias"));

new Vue({
  el: '#app',
  render: h => h(App)
})