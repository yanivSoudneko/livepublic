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
		<stay-list-grid
			:stayData="stayData"
			:isBigMap="true"
			class="stay-grid-container"
		></stay-list-grid>
	</div>
</template>

<style lang="scss" scoped>
.explore {
	max-width: 1210px;
	margin: 0 auto;
	padding: 20px;
	& > * {
		margin-bottom: 20px;
	}
	.filter-input {
		max-width: 300px;
		cursor: pointer;
		.search-svg-icon {
			width: 15px;
			background-color: #ff385c;
			color: white;
			padding: 10px 15px;
			border-radius: 50%;
		}
	}
	.filter {
		&:not(:first-child) {
			margin-left: 10px;
		}
		&:hover {
			filter: brightness(85%);
		}
	}
	//   .stay-grid-container {
	//     display: grid;
	//     grid-template-columns: 1fr 1fr 1fr 1fr;
	//     grid-template-rows: 1fr 1fr 1fr;
	//     gap: 0px 0px;
	//   }
}
</style>
<script>
import stayListGrid from "../cmps/stayList-grid.cmp";
export default {
	name: "Explore",
	data() {
		return { filterTxt: "", stayData: {},
		filterByPrice: null };
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
		}
	},
	created() {
		this.$store.commit({
			type: "toggleHeroImage",
			toggleShow: false,
		});
		//TODO:see about deprecating this params call
		const {
			params: { filterBy },
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

		this.filterTxt = filterBy.filterTxt;
		this.$store
			.dispatch({ type: "stay/fetchFiltered", filterBy })
			.then((res) => {
				this.stayData = res;
			});
	},
	components: {
		stayListGrid,
	},
};
</script>
