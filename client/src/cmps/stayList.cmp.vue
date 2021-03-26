<template>
  <div class="stay-list">
    <div class="stay-carousel">
      <stay-preview
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
export default {
  props: {
    stayData: {
      type: Object,
    },
  },
  name: "Stay-List",
  components: { stayPreview },
};
</script>
