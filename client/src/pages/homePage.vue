<template>
	<div class="home">
		<inspirtion-destionation />
		<div class="flex j-between a-center">
			<h1 class="stays-header">Popular Stays</h1>
			<a class="see-all"
				style="cursor: pointer"
				@click="exploreTarget('', 'Popular Stays')"
				>See All</a
			>
		</div>

		<loader v-if="!topRated.stays" />
		<stay-list v-if="topRated.stays" :stayData="topRated"></stay-list>
		<category-list />
		<div class="become-host-header">
			<div class="host-header-content">
				<img src="../../misc/heroimg/hero-img.webp" />
				<div class="hero-details">
					<h1>Your world is worth sharing</h1>
					<p>Turn your extra space into your next opportunity.</p>
				</div>
			</div>
			<div>
				<!-- <button class="host-header-btn">Become a host</button> -->
			</div>
		</div>

		<div class="flex j-between a-center">
			<h1 class="stays-header">Top Rated Stays in New York</h1>
			<a
				style="cursor: pointer"
				@click="
					exploreTarget('new york', 'Top Rated Stays in New York')
				"
				>See All</a
			>
		</div>
		<loader v-if="!topRatedNY.stays" />
		<stay-list v-if="topRatedNY.stays" :stayData="topRatedNY"></stay-list>
		<!-- <footer-cmp /> -->
	</div>
</template>


<script>
import locationList from "../cmps/location.cmp";
import inspirtionDestionation from "../cmps/inspiration-destination.cmp";
import categoryList from "../cmps/categoryList.cmp";
import stayList from "../cmps/stayList.cmp";
import loader from "../cmps/loader.cmp";
// import FooterCmp from "../cmps/footer.cmp.vue";

export default {
	name: "Home",
	data() {
		return {
			topRated: {},
			topRatedNY: {},
		};
	},
	created() {
		this.$store.commit({ type: "stay/setFilterBy", filterBy: null });
		this.$store.dispatch({ type: "stay/loadLocations" });
		// toprated
		this.$store
			.dispatch({
				type: "stay/fetchFiltered",
				filterBy: { rating: 96, reviews: 30, size: 4 },
			})
			.then(({ stays, filterBy }) => {
				this.topRated = { stays, filterBy };
				console.log(
					"🚀 ~ file: homePage.vue ~ line 80 ~ .then ~ this.topRated",
					this.topRated
				);
			});
		//top rated in NY
		this.$store
			.dispatch({
				type: "stay/fetchFiltered",
				filterBy: {
					rating: 96,
					reviews: 30,
					filterTxt: "New York",
					size: 4,
				},
			})
			.then(({ stays, filterBy }) => {
				this.topRatedNY = { stays, filterBy };
				console.log(
					"🚀 ~ file: homePage.vue ~ line 90 ~ .then ~ 		this.topRatedNY",
					this.topRatedNY
				);
			});
		// toggle hero image on
		this.$store.commit({
			type: "toggleHeroImage",
			toggleShow: true,
		});
	},
	methods: {
		exploreTarget(filterTxt, subject) {
			this.$router.push({
				name: "Explore",
				params: {
					filterBy: {
						filterTxt,
						size: 20,
						reviews: 30,
						rating: 96,
					},
					subject,
				},
			});
		},
	},
	components: {
		locationList,
		categoryList,
		stayList,
		inspirtionDestionation,
		loader,
		// FooterCmp,
	},
};
</script>
