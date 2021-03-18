<template>
  <div class="stay" v-if="stay">
    <h1>{{ stay.name }}</h1>
    <div class="underTitle">
      <span class="underTitle-review">{{ ratingLength }}</span>
      <span class="underTitle-addres">{{ stay.loc.address }}</span>
      <div class="stay-page-container">
        <div class="stay-page-img-container" v-for="url in stay.imgUrls" :key="url">
          <img :src="url" alt="imgUrl" />
        </div>
      </div>
    </div>

    {{ stay }}
  </div>
</template>
<style scoped>
.underTitle > * {
  padding: 10px;
}
</style>
<script>
// @ is an alias to /src
export default {
  name: 'Stay',
  data() {
    return {
      stayId: null,
      stay: null,
    };
  },
  methods: {},
  computed: {
    rating() {
      const reviews = this.stay.reviews;
      const rateTotal = reviews.reduce((acc, obj) => {
        acc += obj.rate;
        return acc;
      }, 0);
      return rateTotal / reviews.length;
    },
    ratingLength() {
      const reviewsLength = this.stay.reviews.length;
      const addS = reviewsLength > 1 ? 's' : '';
      const string = reviewsLength + ' Review' + addS;
      return string;
    },
  },
  components: {},
  created() {
    const { stayId } = this.$route.params;
    console.log('stayId', stayId);
    this.stayId = stayId;
    this.$store.dispatch({ type: 'stay/load' }).then(() => {
      this.$store.dispatch({ type: 'stay/getById', stayId }).then(stay => {
        this.stay = stay;
      });
    });
  },
};
</script>
