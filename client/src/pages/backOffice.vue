<template>
	<div class="back-office">
		<h2>Hello {{ user.fullname }}</h2>

		<div class="top-section flex j-between">
			<div class="reservations">
				<h2>Pending/Accepted Reservations</h2>
				<div class="reservation-list">list</div>
			</div>
			<div class="host-summary">
				<h2>Host Summary</h2>
				<div class="host-details">
					<img :src="user.imgUrl" :alt="user.fullname" />
				</div>
			</div>
		</div>
		<div class="stays-container flex columns">
			<div class="header">
				<h2>My Stays(hosting)</h2>
				<a class="host-new-stay">Host New Stay</a>
			</div>
			<div class="hosting-stays">list</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.back-office {
	& * {
		border: 1px solid #3f3e3e;
		background-color: red;
		color: white;
		margin: 5px;
	}
}
</style>

<script>
export default {
	name: "Back-Office",
	computed: {
		user() {
			return this.$store.getters["user/user"];
		},
	},
	created() {
		this.$store.commit({
			type: "toggleHeroImage",
			toggleShow: false,
		});
	},
};
</script>