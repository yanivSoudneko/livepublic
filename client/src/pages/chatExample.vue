<template>
	<div class="chat">
		{{ msgs }}
		<input type="text" v-model="msg" />
		<button @click="sendMsg">Send</button>
	</div>
</template>

<script>
import { socketService } from "../services/socket.service";
const ADD_MESSAGE_EVENT = "addMsg";
export default {
	name: "ChatTest",
	data() {
		return { msgs: [], msg: "" };
	},
	methods: {
		addMsg(msg) {
			this.msgs.push(msg);
			console.log(
				"🚀 ~ file: explorePage.vue ~ line 82 ~ addMsg ~ msg",
				this.msgs
			);
		},
		initSocket() {
			socketService.setup();
			socketService.on(ADD_MESSAGE_EVENT, this.addMsg);
		},
		sendMsg() {
			socketService.emit(ADD_MESSAGE_EVENT, this.msg);
			this.msg = "";
		},
	},

	created() {
		//TEST
		this.initSocket();
		///////
		this.sendMsg();

		this.$store.commit({
			type: "toggleHeroImage",
			toggleShow: false,
		});
	},
	destroyed() {
		socketService.off(ADD_MESSAGE_EVENT, this.addMsg);
		socketService.terminate();
	},
};
</script>
