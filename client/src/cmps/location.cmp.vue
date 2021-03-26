<template>
  <div class="main-list">
    <div class="location-list">
      <h1 class="explore-header">Explore nearby</h1>
      <div
        class="location-preview"
        v-for="location in exploreList"
        :key="location._id"
        @click="exploreByName(location.name)"
      >
        <img
          class="img-explore-cityes"
          :src="location.url"
          :alt="location.name"
        />
        <div class="explore-details">
          <h5>{{ location.name }}</h5>
          <h5 class="distance">
            {{ hourOrMinutes(location.distanceTime) }} drive
          </h5>
        </div>
      </div>
    </div>
  </div>
</template>



<script>
export default {
  name: "location-list",
  methods: {
    hourOrMinutes(time) {
      if (time < 60) return time + " minute";
      return parseInt(Math.ceil(time / 60)) + " hour";
    },
    exploreByName(filter) {
      this.$router.push({
        name: "Explore",
        params: { filterBy: { filterTxt: filter } },
      });
    },
  },
  computed: {
    exploreList() {
      return this.$store.getters["stay/getLocations"];
    },
  },
};
</script>
