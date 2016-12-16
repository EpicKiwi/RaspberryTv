<template>
<div class="clock">
	<div class="time">
		<span class="hours" >{{hours}}</span>
		<span class="minutes" >{{minutes}}</span>
	</div>
	<div class="date">
		<span class="day" >{{day}}</span> 
		<span class="dayNumber" >{{dayNumber}}</span> 
		<span class="month" >{{month}}</span> 
		<span class="year" >{{year}}</span> 
	</div>
</div>
</template>

<script>
import moment from "moment"
moment.locale('fr')

export default {
  name: 'clock',
  data() {return{
  	hours: "",
  	minutes: "",
  	seconds: "",
  	day: "",
  	dayNumber: "",
  	month: "",
  	year: ""
  }},
  mounted() {
  	this.$interval = setInterval(() => {
  		let now = moment();
  		this.hours = now.format("HH")
  		this.minutes = now.format("mm")
  		this.seconds = now.format("ss")
  		this.day = now.format("dddd")
  		this.dayNumber = now.format("DD")
  		this.month = now.format("MMMM")
  		this.year = now.format("YYYY")
  	},1000);
  },
  destroyed() {
  	clearInterval(this.$interval)
  }
}
</script>

<style>
.clock {
	width: 100%;
	color: rgba(255,255,255,0.8);
	text-align: center;
}

.time {
	font-size: 25vh;
	margin-bottom: 1vh;
	font-weight: lighter;
}

.time .hours {
	font-weight: bold;
}

.date {
	font-size: 5vh;
}
</style>
