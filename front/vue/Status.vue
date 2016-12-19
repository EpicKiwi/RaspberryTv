<template>
<div class="statusToken">
	<div class="statusIcon">
		<i class="fa fa-refresh turn-icon" v-show="messageType == 'loading'" aria-hidden="true"></i>
		<i class="fa fa-exclamation-triangle" v-show="messageType == 'error'" aria-hidden="true"></i>
	</div>
	<div class="statusMessage">
		<p v-show="messageType == 'loading'" >Chargement</p>
		<p> <span v-show="messageType == 'error'" >Érreur</span> <span v-show="messageInfo && messageInfo != ''" ><span v-show="messageType == 'error'" >: </span>{{messageInfo}}</span></p>
		
	</div>
</div>
</template>

<script>
export default {
	name : 'status',
	props: {
		messageType: {
			type: String,
			required: true
		},
		messageInfo: {
			type: String
		}
	},
	data() {return{
		content: "Connexion socket en cours..."
	}}
}
</script>

<style>
@import "../css/font-awesome.css";

.statusToken {
	position: absolute;
	top: 0;
	left: 0;
	color: inherit;
	padding: 10px;
}

.statusIcon {
	float: left;
	margin-right: 10px;
	font-size: 5vh;
}

.statusMessage {
	white-space: nowrap;
	line-height: 5vh;
	font-size: 3vh;
}

@keyframes turn {
	from {transform: rotate(0deg);}
	to {transform: rotate(360deg);}
}

@-webkit-keyframes turn {
	from {-webkit-transform: rotate(0deg);}
	to {-webkit-transform: rotate(360deg);}
}

.turn-icon {
	animation-name: turn;
	animation-timing-function: linear;
	animation-duration: 2s;
	animation-iteration-count: infinite;
}

</style>