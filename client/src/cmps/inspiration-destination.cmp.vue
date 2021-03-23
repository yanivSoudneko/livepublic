<template>
	<div class="category-list">
		<h1 class="category-header">Inpiration Destionations</h1>
		<!-- <div class="categories "> -->
		<div class="category" @click="exploreType('Tel Aviv')">
			<img
				src="@/assets/img/telAviv.jpg"
				alt="live anywhere"
			/>
			<p>Tel Aviv</p>
		</div>
		<div class="category" @click="exploreType('Tokyo')">
			<img
				src="@/assets/img/tokyo.jpg"
				alt="Unique stays"
			/>
			<p>Tokyo</p>
		</div>
		<div class="category" @click="exploreType('Paris')">
			<img
				src="@/assets/img/paris.jpg"
				alt="Paris"
			/>
			<p>Paris</p>
		</div>
		<div class="category" @click="exploreType('New York')">
			<img
				src="@/assets/img/newYork.jpg"
				alt="New York"
			/>
			<p>New York</p>
		</div>
	
	</div>
	
</template>

<style lang="scss">
.category-list {
	display: grid;
	grid-template-columns: 1fr 1fr 1fr 1fr;
	grid-template-rows: auto auto;
	gap: 0px 0px;
	grid-template-areas:
		"header header header header"
		". . . .";
	margin: 0 auto;
	max-width: 1210px;
	margin-bottom: 100px;

	.category-header {
		grid-area: header;
		// padding-left: 36px;
	}
	.category {
		margin: 0 auto;
		cursor: pointer;

		img {
			width: 270px;
			height: 300px;
			border-radius: 10px;
		}
	}
}
</style>

<script>
export default {
	name: "Category-List",
	methods: {
		exploreType(type) {
			this.$router.push({
				name: "Explore",
				params: { filterBy: { filterTxt: type, type } },
			});
		},
	},
};
</script>