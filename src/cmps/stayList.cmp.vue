<template>
	<div class="stay-list">
		<div class="stay-preview" v-for="stay in stays" :key="stay._id">
			<img
				class="img-explore-cityes"
				:src="stay.imgUrls[0]"
				:alt="stay.name"
			/>
			<h5>{{ stay.loc.address }}</h5>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.stay-list {
	height: auto;
	width: 100%;
	display: grid;
	grid-template-columns: 20% 20% 20% 20% 20%;
	grid-template-rows: 100% 100%;
	.stay-preview {
		border: 1px solid #fefefe;
		display: flex;
		justify-content: center;
		align-items: center;
		.img-explore-cityes {
			max-width: 70px;
			border-radius: 10px;
			margin: 5px;
			object-fit: cover;
			vertical-align: bottom;
		}
	}
}
</style>

<script>
export default {
	name: "stay-list",
	computed: {
		stays() {
			return this.$store.getters["stay/getStays"];
		},
	},
	created() {
		this.$store.dispatch({ type: "stay/load" });
	},
};
</script>
