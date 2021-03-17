<template>
	<div class="stay-list">
		{{ stayList }}
	</div>
</template>

<style scoped></style>

<script>
export default {
	name: "stay-list",
	computed: {
		stayList() {
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