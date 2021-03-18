<template>
  <div class="stay" v-if="stay">
    <h1>{{ stay.name }}</h1>
    <div class="underTitle">
      <div class="rateing">
        <span class="underTitle-review"
          ><i class="fas fa-star">{{ rating }}</i></span
        >
      </div>
      <span>{{ ratingLength }}</span>
      <span class="underTitle-addres">{{ stay.loc.address }}</span>
      <div class="stay-page-container">
        <div class="stay-page-img-container" v-for="(url, index) in stay.imgUrls" :key="index">
          <img :src="url" alt="imgUrl" :class="'img' + index" />
        </div>
      </div>
    </div>

    {{ stay }}
  </div>
</template>
<style lang="scss">
.stay {
  .underTitle > * {
    padding: 10px;
  }
  .underTitle > *:first-child {
    padding: 0px;
  }
  .rateing {
    display: inline;
  }

  .stay-page-container {
    max-width: 80%;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 0.5fr 0.5fr;
    grid-template-rows: 1fr 1fr;
    gap: 10px 10px;
    grid-template-areas:
      'img0 img1 img2'
      'img0 img3 img4';
    .stay-page-img-container {
      width: 100%;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      .img0 {
        grid-area: img0;
      }
      .img1 {
        grid-area: img1;
      }
      .img2 {
        grid-area: img2;
      }
      .img3 {
        grid-area: img3;
      }
      .img4 {
        grid-area: img4;
      }
    }
  }
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
