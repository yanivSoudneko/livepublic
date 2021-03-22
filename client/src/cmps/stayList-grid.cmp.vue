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
      <!-- <google-maps class="map" :isBigMap="isBigMap" v-if="stayData.stays" :stays="stayData.stays" /> -->
    </div>
  </div>
</template>

<style lang="scss" scoped>
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
