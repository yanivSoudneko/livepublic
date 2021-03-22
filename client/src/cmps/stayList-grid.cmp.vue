<template>
  <div class="stay-list">
    <div class="stay-carousel">
      <stay-preview
        class="stay-preview-grid"
        @click="$router.push('/stay/' + stay._id)"
        v-for="stay in stayData.stays"
        :key="stay._id"
        :stay="stay"
      ></stay-preview>
      <google-maps class="map" :isBigMap="isBigMap" v-if="stayData.stays" :stays="stayData.stays" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.stay-list {
  height: 60vh;
  max-width: 1210px;
  margin: 0 auto;

  .stay-carousel {
    .stays-header {
      grid-area: title;
    }
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    // grid-template-columns: repeat(auto-fit, minmax(250px, 1fr) );
    // grid-template-columns: repeat( auto-fill, minmax(250px, 1fr) );
    grid-template-rows: 1fr 1fr;
    gap: 0px 0px;
    grid-template-areas:
      "title title title title"
      ". . map map"
      ". . map map";
    grid-auto-flow: dense;
    grid-gap: 1rem;
  }
  .stay-preview-grid:nth-child(1) {
    grid-column: 1;
  }
  .stay-preview-grid:nth-child(2) {
    grid-column: 1;
  }
  .stay-preview-grid:nth-child(3) {
    grid-column: 2;
    grid-row: 2;
  }
  .map {
    grid-column: 3/5;
    grid-row: 1/3;
  }
}
</style>

<script>
import stayPreview from "./stayPreview.cmp";
import googleMaps from "../cmps/google.maps.cmp";
export default {
  props: {
    stayData: {
      type: Object,
    },
    isBigMap: { type: Boolean },
  },
  name: "Stay-List",
  components: { stayPreview },
  created() {
    console.log({ DATA: this.stayData });
  },
  components: {
    googleMaps,
    stayPreview,
  },
};
</script>
