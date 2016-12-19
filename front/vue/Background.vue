<template>
<div class="background" :style="{backgroundImage:'url(\''+url+'\')'}">
	<div class="background-info">
		<p>{{copyright}}</p>
	</div>
</div>	
</template>

<script>
export default {
	name: "background",
	data(){return{
		url : "",
		copyright: "",
	}},
	sockets: {
	    newBackground (background) {
	    	console.log("New background",background)
	      this.url = background.url
	      this.copyright = background.copyright
	    }
	}
}
</script>

<style>
.background {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-size: cover;
	background-position: center center;
	background-repeat: no-repeat;
	opacity: 0.8;
}

.background-info {
	position: absolute;
	bottom: 0;
	right: 0;
	font-size: 2vh;
	padding: 10px;
}
</style>