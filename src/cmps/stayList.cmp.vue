<template>
  <div class="stay-list">
    <div class="stay-carousel">
      <h1 class="stays-header">Popular Stays</h1>
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
  max-width: 1210px;
  margin: 0 auto;

  .stay-carousel {
    .stays-header {
      grid-area: title;
      margin-bottom: 10px;
    }
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    // grid-template-columns: repeat(auto-fit, minmax(250px, 1fr) );
    // grid-template-columns: repeat( auto-fill, minmax(250px, 1fr) );
    grid-template-rows: auto 1fr 1fr;
    gap: 0px 0px;
    grid-template-areas:
      "title title title title"
      ". . . ."
      ". . . .";
    grid-auto-flow: dense;
    grid-gap: 1rem;
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
