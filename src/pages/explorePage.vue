<template>
	<div class="explore">
		<h1>Explore</h1>
		<explore-list />
		<category-list />
		<div class="become-host-header">
			<h1>Your world is worth sharing</h1>
			<p>Turn your extra space into your next opportunity.</p>
			<button>Become a host</button>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.explore {
	& > * {
		padding-bottom: 50px;
	}
	.become-host-header {
		color: white;
		height: 60vh;
		background-image: url("https://a0.muscache.com/im/pictures/eff28e1d-51c4-49ff-8266-68d6929ea1ec.jpg?im_w=1680");
	}
}
</style>
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
