<template>
	<section class="category-container">
		<h1 class="category-header">Inspiration Destionations</h1>
		<div class="category-list">
			<!-- <div class="categories "> -->
			<div class="category" @click="exploreCity('Tel Aviv')">
				<img src="@/assets/img/telAviv.jpg" alt="live anywhere" />
				<p>Tel Aviv</p>
			</div>
			<div class="category" @click="exploreCity('London')">
				<img src="@/assets/img/tokyo.jpg" alt="Unique stays" />
				<p>London</p>
			</div>
			<div class="category" @click="exploreCity('Paris')">
				<img src="@/assets/img/paris.jpg" alt="Paris" />
				<p>Paris</p>
			</div>
			<div class="category" @click="exploreCity('New York')">
				<img src="@/assets/img/newYork.jpg" alt="New York" />
				<p>New York</p>
			</div>
		</div>
	</section>
</template>

 
<script>
export default {
	name: "Category-List",
	methods: {
		exploreCity(cityName) {
			this.$router.push({
				name: "Explore",
				params: {
					filterBy: {
						filterTxt: cityName,
						size: 20,
						reviews: 1,
						rating: 10,
					},
				},
			});
		},
	},
};
</script>
