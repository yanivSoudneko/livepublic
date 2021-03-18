<template>
	<div class="explore">hello</div>
</template>

<style lang="scss" scoped>
.explore {
}
</style>
<script>
import locationList from "../cmps/locationList.cmp";
import categoryList from "../cmps/categoryList.cmp";
import stayList from "../cmps/stayList.cmp";
export default {
	name: "Explore",
	created() {
		this.$store.commit({
			type: "toggleHeroImage",
			toggleShow: false,
		});
	},
	components: {
		locationList,
		categoryList,
		stayList,
	},
};
</script>
