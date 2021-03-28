<template>
	<div class="explore flex columns">
		<!-- filter by location -->
		<div class="filter-input pill-pad flex j-between a-center">
			<input
				type="text"
				v-model="filterTxt"
				@keyup.enter="setNewFilter"
			/>
			<div class="search-svg-icon flex j-center" @click="setNewFilter">
				<svg
					viewBox="0 0 32 32"
					xmlns="http://www.w3.org/2000/svg"
					style="
						display: block;
						fill: none;
						height: 12px;
						width: 12px;
						stroke: currentColor;
						stroke-width: 5.333333333333333;
						overflow: visible;
					"
					aria-hidden="true"
					role="presentation"
					focusable="false"
				>
					<g fill="none">
						<path
							d="m13 24c6.0751322 0 11-4.9248678 11-11 0-6.07513225-4.9248678-11-11-11-6.07513225 0-11 4.92486775-11 11 0 6.0751322 4.92486775 11 11 11zm8-3 9 9"
						></path>
					</g>
				</svg>
			</div>
			<!-- <button @click="setNewFilter">Go</button> -->
		</div>
		<!-- filters by  -->
		<small class="head-title-visits">300+ stays</small>
		<h1 class="head-title-txt">Entire homes</h1>
		<router-link to="/">Back</router-link>
		<div class="filters flex columns">
			<div class="sub-filter-container flex">
				<div class="filter pill-pad">Filter Type</div>
				<div class="filter pill-pad">Filter Price</div>
			</div>
			<div class="sub-filter-btns flex">
				<button class="filter pill-pad">Instant Book</button>
				<button class="filter pill-pad">More Filters</button>
			</div>
		</div>
		<!-- locationList -->
		<loader v-if="!stayData.stays" />
		<stay-list-grid
			v-if="stayData.stays"
			:stayData="stayData"
			:isBigMap="true"
			class="stay-grid-container"
		></stay-list-grid>
		<!-- <p v-else-if="!stayData.stays.length">No house available</p> -->
	</div>
</template>
<style lng="scss">
.head-title-visits {
	padding-left: 2px;
}
.sub-filter-btns {
	margin-top: 10px;
}
</style>


<script>
import stayListGrid from "../cmps/stayList-grid.cmp";
import loader from "../cmps/loader.cmp";
export default {
	name: "Explore",
	data() {
		return { filterTxt: "", stayData: {}, filterByPrice: null };
	},
	methods: {
		// 	setFilters() {
		//   const { filterTxt, filterByPrice,  } = this;

		//   const filterBy = {
		//     filterTxt,
		//     filterByPrice,
		//   };
		//   if (filterTxt === '') {
		//     this.$refs.filterTxtInput.focus();
		//     return;
		//   }

		//   this.$store.commit({ type: 'stay/setFilterBy', filterBy });
		//   this.$emit('closeFilters', true);
		//   if (this.$route.name === 'Explore') {
		//     return;
		//   }
		//   this.$router.push({
		//     name: 'Explore',
		//     params: {
		//       filterBy,
		//     },
		//   });
		setNewFilter() {
			this.$store
				.dispatch({
					type: "stay/fetchFiltered",
					filterBy: { filterTxt: this.filterTxt },
				})
				.then((res) => {
					this.stayData = res;
					console.log(
						"🚀 ~ file: explorePage.vue ~ line 105 ~ .then ~ this.stayData",
						this.stayData
					);
				});
		},
	},
	created() {
		this.$store.commit({
			type: "toggleHeroImage",
			toggleShow: false,
		});
		//TODO:see about deprecating this params call
		const {
			params: { filterBy, subject },
		} = this.$route;

		if (!filterBy) {
			this.$store
				.dispatch({ type: "stay/fetchFiltered", filterBy: null })
				.then((res) => {
					this.stayData = res;
				});
			this.filterTxt = "Explore locations";
			return;
		}

		this.filterTxt =
			subject && subject !== "" ? subject : filterBy.filterTxt;
		this.$store
			.dispatch({ type: "stay/fetchFiltered", filterBy })
			.then((res) => {
				this.stayData = res;
			});
	},
	components: {
		stayListGrid,
		loader,
	},
};
</script>
