<template>
	<div id="app" class="main-layout">
		<nav-bar />
		<div class="view">
			<router-view />
		</div>
		<footer-cmp />
	</div>
</template>

<style lang="scss" scoped>
#app {
	.view {
		// height: 100vh;
		max-width: 1210px;
		margin: 0 auto;
		// padding-bottom: 50px;
	}
}
</style>

<script>
import { socketService } from "./services/socket.service";
import navBar from "./cmps/header.cmp";
import footerCmp from "./cmps/footer.cmp";
export default {
	components: {
		navBar,
		footerCmp,
	},
	methods: {
		notifyOnUserLeft(data) {
			console.log(
				"🚀 ~ file: App.vue ~ line 31 ~ notifyOnUserLeft ~ data",
				data
			);
		},
	},
	created() {
		console.log("checking for stored user");
		this.$store.dispatch({ type: "user/checkStoredUser" });
		socketService.on("user-left", this.notifyOnUserLeft);
	},
	destroyed() {
		socketService.off("user-left", this.notifyOnUserLeft);
	},
};
</script>
