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
        <img class="img-explore-cityes" :src="location.url" :alt="location.name" />
        <div>
          <h5>{{ location.name }}</h5>
          <h5 class="distance">{{ hourOrMinutes(location.distanceTime) }} drive</h5>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.main-list {
  margin: 0 auto;
  max-width: 1210px;
  margin-bottom: 100px;
  .explore-header {
    grid-area: header;
  }
  .location-list {
    height: auto;
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    grid-template-rows: 0.4fr 1fr 1fr;
    justify-items: start;
    grid-template-areas:
      'header header header header header'
      '. . . . .'
      '. . . . .';
    gap: 16px !important;
    .location-preview {
      cursor: pointer;
      margin-left: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 0;
      .img-explore-cityes {
        max-width: 70px;
        border-radius: 10px;
        margin: 5px;
        object-fit: cover;
        vertical-align: bottom;
      }
      h5 {
        font-weight: 600;
      }
      .distance {
        color: #7a7a7a;
      }
    }
  }
}
</style>

<script>
export default {
  name: 'location-list',
  methods: {
    hourOrMinutes(time) {
      if (time < 60) return time + ' minute';
      return parseInt(Math.ceil(time / 60)) + ' hour';
    },
    exploreByName(filter) {
      this.$router.push({
        name: 'Explore',
        params: { filterBy: { filterTxt: filter } },
      });
    },
  },
  computed: {
    exploreList() {
      return this.$store.getters['stay/getLocations'];
    },
  },
};
</script>
