<template>
<div id="app">
  <nav>
  <div class="logo"><i class="fa fa-music" aria-hidden="true"></i></div>
  <div class="content"><h1>Lecture de media sur RaspberryTv</h1>
  <div class="player-control"></div></div>
  </nav>
  <section>
    <ul class="playlist">
      <li><span class="position">1</span><span class="delete"><i class="fa fa-times"></i></span><h3>title</h3><span class="favorite"><i class="fa fa-heart"></i></span><span class="source"><i class="fa fa-youtube-play" aria-hidden="true"></i></span></li>
      <li><span class="position">2</span><span class="delete"><i class="fa fa-times"></i></span><h3>title 2</h3><span class="favorite"><i class="fa fa-heart"></i></span><span class="source"><i class="fa fa-youtube-play" aria-hidden="true"></i></span></li>
      <li><span class="position">3</span><span class="delete"><i class="fa fa-times"></i></span><h3>title 3</h3><span class="favorite"><i class="fa fa-heart"></i></span><span class="source"><i class="fa fa-soundcloud" aria-hidden="true"></i></span></li>
      <li><span class="position">4</span><span class="delete"><i class="fa fa-times"></i></span><h3>Repudiandae facere nihil excepturi non ipsum amet qui. Explicabo qui dolor non qui. Voluptatem exercitationem quis impedit impedit libero exercitationem harum modi. Dolores totam rerum quia eligendi exercitationem autem.</h3><span class="favorite"><i class="fa fa-heart"></i></span><span class="source"><i class="fa fa-youtube-play" aria-hidden="true"></i></span></li>
      <li><span class="position">5</span><span class="delete"><i class="fa fa-times"></i></span><h3>title 5</h3><span class="favorite"><i class="fa fa-heart"></i></span><span class="source"><i class="fa fa-vimeo" aria-hidden="true"></i></span></li>
      <li><span class="position">6</span><span class="delete"><i class="fa fa-times"></i></span><h3>title 5</h3><span class="favorite"><i class="fa fa-heart"></i></span><span class="source"><i class="fa fa-ellipsis-h" aria-hidden="true"></i></span></li>
    </ul>
  </section>
</div>
</template>

<script>

export default {
  name: 'app',
  data() {return{
    socketConnected: false
  }},
  components : {
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
@import "../css/font-awesome.css";

#app {
  background-color: #fcfcfc;
  min-height: 100vh;
}

#app > nav {
  width: 100vw;
  height: 50px;
  background-color: white;
  overflow: hidden;
  position: relative;
  /*border-bottom: solid 2px #fc7500;*/
  box-shadow: 0 0 5px rgba(0,0,0,0.5);
}

#app > nav .logo {
  width: 50px;
  height: 50px;
  padding: 20px;
  line-height: 50px;
  font-size: 30px;
  background-color: #fc7500;
  color: white;
  text-align: center;
  transform: rotate(20deg);
  position: absolute;
  top: -20px;
  left: -10px;
}

#app > nav .logo i {
  transform: rotate(-20deg);
}

#app > nav .content {
  width: 100%;
  text-align: center;
  line-height: 50px;
  font-family: "Open Sans", sans-serif;
  font-size: 20px;
  color: #fc7500;
}

.playlist {
  margin-top: 20px;
  margin-left: auto;
  margin-right: auto;
  width: 50vw;
}

.playlist li {
  display: flex;
  flex-direction: row;
  font-family: "Open Sans", sans-serif;
  margin-top: 10px;
  padding-bottom: 10px;
  border-bottom: solid 1px #d6d6d6;
}

.playlist li > *:not(:last-child) {
  margin-right: 10px;
}

.playlist li h3 {
  flex: 1;
  overflow: hidden;
  white-space: nowrap;
}

.playlist li .source {
  font-size: 20px;
  width: 30px;
  text-align: center;
}

.playlist li .delete, .playlist li .favorite {
  font-size: 15px;
  color: #d6d6d6;
  opacity: 0;
  transition: 0.1s linear opacity;
  cursor: pointer;
  line-height: 18px;
}

.playlist li:hover .delete, .playlist li:hover .favorite {
  opacity: 1;
}

.playlist li .position {
  color: #d6d6d6;
}

.playlist li .fa-youtube-play {
  color: rgb(204, 24, 30);
}

.playlist li .fa-soundcloud {
  color: rgb(255, 85, 0);
}

.playlist li .fa-vimeo {
  color: rgb(13, 173, 214);
}

.playlist li .fa-ellipsis-h {
  color: #d6d6d6;
} 
</style>
