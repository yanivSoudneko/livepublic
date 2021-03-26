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
    </div>
  </div>
</template>



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
  components: {
    googleMaps,
    stayPreview,
  },
};
</script>
