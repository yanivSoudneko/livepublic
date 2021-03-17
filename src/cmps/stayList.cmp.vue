<template>
  <div class="stay-list">
    <h1>Popular Stays</h1>
    <div class="flex">
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
}
</style>

<script>
import stayPreview from './stayPreview.cmp';
export default {
  name: 'Stay-List',
  computed: {
    stayList() {
      console.log(this.$store.getters['stay/getStays']);
      return this.$store.getters['stay/getStays'];
    },
  },
  components: { stayPreview },
};
</script>
