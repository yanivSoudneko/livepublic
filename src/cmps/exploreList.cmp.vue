<template>
	<div class="location-list">
		<div
			class="location-preview flex j-between"
			v-for="location in exploreList"
			:key="location._id"
		>
			<img
				class="img-explore-cities"
				:src="location.url"
				:alt="location.name"
			/>
			<div>
				<h5>{{ location.name }}</h5>
				<h5>{{ hourOrMinutes(location.distanceTime) }} drive</h5>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.location-list {
	height: auto;
	width: 100%;
	display: grid;
	grid-template-columns: 20% 20% 20% 20% 20%;
	grid-template-rows: 100% 100%;
	.location-preview {
		border: 1px solid #fefefe;
		display: flex;
		justify-content: center;
		align-items: center;
		.img-explore-cities {
			max-width: 70px;
			border-radius: 10px;
			margin: 5px;
			object-fit: cover;
			vertical-align: bottom;
		}
	}
}
</style>

<script>
export default {
	name: "location-list",
	methods: {
		hourOrMinutes(time) {
			if (time < 60) return "minute";
			return "hour";
		},
	},
	computed: {
		exploreList() {
			console.log(this.$store.getters["stay/getLocations"]);
			return this.$store.getters["stay/getLocations"];
		},
	},
};
</script>
