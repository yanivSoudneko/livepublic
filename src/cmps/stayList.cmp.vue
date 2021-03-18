<template>
  <div class="stay-list">
    <h1>Popular Stays</h1>
    <div class="flex stay-carousel">
      <stay-preview
        @click="$router.push('/stay/' + stay._id)"
        v-for="stay in stayList"
        :key="stay._id"
        :stay="stay"
      ></stay-preview>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.stay-list {
  height: 60vh;
  .stay-carousel {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    grid-auto-rows: auto;
    grid-auto-flow: dense;
    grid-gap: 1rem;
    max-width: 1210px;
    margin: 0 auto;
  }
}
</style>

<script>
import stayPreview from "./stayPreview.cmp";
export default {
  name: "Stay-List",
  computed: {
    stayList() {
      console.log(this.$store.getters["stay/getStays"]);
      return this.$store.getters["stay/getStays"];
    },
  },
  components: { stayPreview },
};
</script>
