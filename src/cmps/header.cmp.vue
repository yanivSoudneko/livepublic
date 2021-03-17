<template>
	<div class="nav-bar">
		<div class="logo"><img src="../../materials/icon.png" /></div>
		<div >
				<router-link to="/">
					Explore
				</router-link>
				<router-link
					to="/host"
				>
					Become Host
				</router-link>
				<router-link
					to="/login"
				>
					Login
				</router-link>
		</div>
	</div>
			
</template>
<style scoped>
.nav-bar{
	display: flex;
    justify-content: space-between;
    max-width: 1060px;
    margin: 0 auto;
}
</style>


<script>
export default {
	name: "NavBar",
	computed: {
		user() {
			return this.$store.getters["user/user"];
		},
	},
	methods: {
		logout() {
			this.$store.dispatch({ type: "user/logout" });
		},
	},
};
</script>