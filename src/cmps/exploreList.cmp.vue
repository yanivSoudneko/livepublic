<template>
  <div class="location-list">
    <div class="location-preview flex j-between" v-for="location in exploreList" :key="location._id">
      <img class="img-explore-cities" :src="location.url" :alt="location.name" />
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
  grid-template-columns: repeat(4, 1fr) !important;
  grid-auto-flow: row !important;
  padding-left: 0px !important;
  scroll-padding: 0px !important;
  gap: 16px !important;
  overflow-x: auto !important;
  scroll-snap-type: x mandatory !important;
  --exp-pdw-sm-bot: 48px;
  --exp-pdw-sm-top: 4px;
  --exp-pdw-md-bot: 8px;
  --exp-pdw-md-top: 40px;
  --exp-pdw-lg-bot: 24px;
  --exp-pdw-lg-top: 56px;
  // font-family: Circular, -apple-system, BlinkMacSystemFont, Roboto, Helvetica Neue, sans-serif;
  .location-preview {
    border: 1px solid #fefefe;
    display: flex;
    justify-content: center;
    align-items: center;
    .img-explore-cityes {
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
  name: 'location-list',
  methods: {
    hourOrMinutes(time) {
      if (time < 60) return 'minute';
      return 'hour';
    },
  },
  computed: {
    exploreList() {
      console.log(this.$store.getters['stay/getLocations']);
      return this.$store.getters['stay/getLocations'];
    },
  },
};
</script>
