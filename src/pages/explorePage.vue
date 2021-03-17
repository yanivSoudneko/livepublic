<template>
	<div class="explore">
		<h1>Explore</h1>
		<explore-list />
		<category-list />
	</div>
</template>


<script>
import exploreList from "../cmps/exploreList.cmp";
import categoryList from "../cmps/categoryList.cmp";
export default {
	name: "Explore",
	created() {
		this.$store.dispatch({ type: "stay/load" });
	},
	components: {
		exploreList,
		categoryList,
	},
};
</script>
