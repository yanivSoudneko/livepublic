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
				<date-picker
					placeholder="Check Out"
					@emitDate="setDate('out', $event)"
				/>
			</div>
		</div>
		<div class="guests border">
			<label>Guests</label>
			<div>1 Guests</div>
		</div>
		<div class="nav-btn border">
			<button @click="setFilters">Search</button>
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
			this.dates[type] = ev;
			console.log(
				"🚀 ~ file: navFilter.cmp.vue ~ line 91 ~ setDate ~      this.dates",
				this.dates
			);
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