<template>
	<div id="app" class="main-layout">
		<nav-bar />
		<div class="view">
			<router-view />
		</div>
		<!-- <footer-cmp /> -->
	</div>
</template>

<style lang="scss" scoped>
#app {
	.view {
		height: 100vh;
		max-width: 1210px;
		margin: 0 auto;
	}
}
</style>

<script>
// import FooterCmp from './cmps/footer.cmp.vue';
import navBar from "./cmps/header.cmp";
export default {
	components: {
		navBar,
		// FooterCmp,
	},
	created() {
		console.log("checking for stored user");
		this.$store.dispatch({ type: "user/checkStoredUser" });
	},
};
// import jsonData from '../data/airbnb.json'
// export default {
//   created() {
//     // console.log(jsonData);
//   },
// }
</script>
