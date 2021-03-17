<template>
	<div class="stay-list">
		<div class="stay-preview" v-for="stay in stays" :key="stay._id">
			{{ stay.loc.address }}
			<img :src="stay.imgUrls[0]" :alt="stay.name" />
		</div>
	</div>
</template>

<style lang="scss" scoped>
.stay-list {
	.stay-preview {
		border: 1px solid #fefefe;
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