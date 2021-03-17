<template>
	<div class="explore">
		<h1>Explore</h1>
		<explore-list />
	</div>
</template>


<script>
import exploreList from "../cmps/exploreList.cmp";
export default {
	name: "Explore",
	created() {
		this.$store.dispatch({ type: "stay/load" });
	},
	components: {
		exploreList,
	},
};
</script>
