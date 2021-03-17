<template>
	<div class="stay-list">
		<div class="stay-preview" v-for="stay in stays" :key="stay._id">
			{{ stay }}
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
			console.log(
				"🚀 ~ file: stayList.cmp.vue ~ line 16 ~ stayList ~  this.$store.getStays",
				this.$store.getters["stay/getStays"]
			);
			return this.$store.getters["stay/getStays"];
		},
	},
	created() {
		this.$store.dispatch({ type: "stay/loadStays" });
	},
};
</script>