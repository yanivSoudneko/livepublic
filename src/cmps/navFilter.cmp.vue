<template>
	<div class="nav-filter">
		<div class="location-search border">
			<label for="location-input">Location</label>
			<input
				type="text"
				id="location-input"
				placeholder="Where are you going?"
				v-model="filterTxt"
			/>
		</div>
		<div class="date-filter border">
			<label>Dates</label>
			<div class="flex">
				<date-picker
					placeholder="Check In"
					@emitDate="setDate('in', $event)"
				/>
			</div>
		</div>
		<div class="guests border">
			<label>Guests</label>
			<div>1 Guests</div>
			<guest-select />
		</div>
		<div class="nav-btn border pill-pad">
			<button @click="setFilters" class="search-btn bn">Search</button>
			<span class="search-svg-icon flex j-center">
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
			</span>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.nav-filter {
	position: fixed;
	display: flex;
	justify-content: center;
	margin-left: 150px;
	top: 100px;
	background-color: #fff;
	height: 85px;
	align-items: center;
	justify-items: center;
	width: 850px;
	padding: 5px;
	border-radius: 75px;
	.location-search {
		display: flex;
		flex-direction: column;
		label {
			height: 100%;
			border: none;
		}
	}
	.nav-btn {
		display: flex;
		.search-btn {
			background-color: transparent;
			border: none;
		}
		.search-svg-icon {
			width: 15px;
			background-color: #ff385c;
			color: white;
			padding: 10px 15px;
			border-radius: 50%;
		}
	}
	.border {
		padding: 5px;
		border-radius: 35px;
	}
	.border:hover {
		background-color: rgb(204, 199, 199);
	}
}
</style>

<script>
import guestSelect from "./guestsSelect.cmp";
import datePicker from "./datepicker.cmp";
export default {
	name: "Nav-Filter",
	data() {
		return {
			scrollPosition: null,
			filterTxt: "",
			dates: { in: null, out: null },
		};
	},
	methods: {
		updateScroll() {
			this.scrollPosition = window.scrollY;
		},
		setFilters() {
			return;
			this.$router.push("/explore");
		},
		setDate(type, ev) {
			console.log(
				"🚀 ~ file: navFilter.cmp.vue ~ line 121 ~ setDate ~ ev",
				ev
			);
			this.dates.in = ev[0];
			this.dates.out = ev[1];
			console.log(
				"🚀 ~ file: navFilter.cmp.vue ~ line 91 ~ setDate ~      this.dates",
				this.dates
			);
		},
	},
	mounted() {
		window.addEventListener("scroll", this.updateScroll);
	},
	destroyed() {
		window.removeEventListener("scroll", this.updateScroll);
	},
	components: { datePicker, guestSelect },
};
</script>