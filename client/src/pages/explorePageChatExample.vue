<template>
	<div class="explore flex columns">
		<!-- filter by location -->
		<div class="filter-input pill-pad flex j-between a-center">
			<input type="text" v-model="filterTxt" />
			<div class="search-svg-icon flex j-center">
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
		</div>
		<!-- filters by  -->
		<div class="filters flex">
			<div class="filter pill-pad">Filter Type</div>
			<div class="filter pill-pad">Filter Price</div>
			<div class="filter pill-pad">Instant Book</div>
			<div class="filter pill-pad">More Filters</div>
		</div>

		<!-- chat -->
		<chat-example />
		<!-- locationList -->
		<stay-list :stayData="stayData"></stay-list>
	</div>
</template>

<style lang="scss" scoped>
.explore {
	padding: 20px;
	& > * {
		margin-bottom: 20px;
	}
	
	.filter-input {
		padding: 0;
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
	.filter:not(:first-child) {
		margin-left: 10px;
	}
}
</style>
<script>
import stayList from "../cmps/stayList.cmp";

import chatExample from "./chatExample";

export default {
	name: "Explore",
	data() {
		return { filterTxt: "", stayData: {} };
	},
	computed: {
		stays() {
			return this.$store.getters({ type: "stay/getStays" });
		},
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
		stayList,
		chatExample,
	},
};
</script>
