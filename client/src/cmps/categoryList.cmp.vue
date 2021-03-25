<template>
<section class="list-container">
		<h1 class="category-header">Live anywhere</h1>
	<div class="category-list">
		<!-- <div class="categories "> -->
		<div class="category" @click="exploreType('entire homes')">
			<img
				src="https://a0.muscache.com/im/pictures/7d82ca14-56e5-4465-8218-dcfa7d69b6ac.jpg?im_w=480"
				alt="live anywhere"
			/>
			<p>Entire Homes</p>
		</div>
		<div class="category" @click="exploreType('Unique stays')">
			<img
				src="https://a0.muscache.com/im/pictures/36f53e61-db8d-403c-9122-5b761c0e4264.jpg?im_w=480"
				alt="Unique stays"
			/>
			<p>Unique stays</p>
		</div>
		<div class="category" @click="exploreType('Cabins and cottages')">
			<img
				src="https://a0.muscache.com/im/pictures/a596c528-a2e9-4417-9bbe-ceb68b2f6b9c.jpg?im_w=480"
				alt="Cabins and cottages"
			/>
			<p>Cabins and cottages</p>
		</div>
		<div class="category" @click="exploreType('Pets Allowed')">
			<img
				src="https://a0.muscache.com/im/pictures/10a638e1-6aff-4313-8033-1275cec83987.jpg?im_w=480"
				alt="Pets Allowed"
			/>
			<p>Pets Allowed</p>
		</div>
	</div>
	</section>
	<!-- </div> -->
</template>



<script>
export default {
	name: "Category-List",
	methods: {
		exploreType(type) {
			this.$router.push({
				name: "Explore",
				params: { filterBy: { type } },
			});
		},
	},
};
</script>