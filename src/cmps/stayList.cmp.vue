<template>
  <div class="stay-list">
    <div class="stay-preview" v-for="stay in stays" :key="stay._id">
      <img class="img-explore-cityes" :src="stay.imgUrls[0]" :alt="stay.name" />
      <h5>{{ stay.loc.address }}</h5>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.stay-list {
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
  .stay-preview {
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
  name: 'stay-list',
  computed: {
    stays() {
      return this.$store.getters['stay/getStays'];
    },
  },
  created() {
    this.$store.dispatch({ type: 'stay/load' });
  },
};
</script>
