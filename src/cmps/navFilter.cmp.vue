<template>
	<div class="nav-filter flex a-center">
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
		<div class="guests">1 Guests</div>
	</div>
</template>

<style lang="scss" scoped></style>

<script>
import datePicker from "./datepicker.cmp";
export default { name: "Nav-Filter", components: { datePicker } };
</script>