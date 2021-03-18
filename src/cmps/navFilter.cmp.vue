<template>
	<div class="nav-filter grid">
		<div class="location-search">
			<label for="location-input">Location</label>
			<input
				type="text"
				id="location-input"
				placeholder="Where are you going?"
			/>
		</div>
		<div class="date-filter">
			<label>dates</label>
			<div class="flex">
				<date-picker placeholder="Check In" />
				<date-picker placeholder="Check Out" />
			</div>
		</div>
		<div class="guests">
			<label>Guests</label>
			<div>1 Guests</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.nav-filter {
	position: fixed;
	top: 100px;
	margin-left: 50px;
	background-color: #fff;
	grid-template-columns: 1fr 1fr 1fr;
	align-items: center;
	justify-items: center;
	gap: 15px;
	width: 850px;
	padding: 20px;
	border-radius: 75px;
	.location-search {
		label {
			height: 100%;
		}
	}
}
</style>

<script>
import datePicker from "./datepicker.cmp";
export default {
	name: "Nav-Filter",
	data() {
		return {
			scrollPosition: null,
		};
	},
	methods: {
		updateScroll() {
			this.scrollPosition = window.scrollY;
		},
	},
	components: { datePicker },
	mounted() {
		window.addEventListener("scroll", this.updateScroll);
	},
	destroyed() {
		window.removeEventListener("scroll", this.updateScroll);
	},
};
</script>