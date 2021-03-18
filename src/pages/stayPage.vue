<template>
  <div class="stay" v-if="stay">
    <h1>{{ stay.name }}</h1>
    <div class="underTitle">
      <div class="rateing">
        <span class="underTitle-review">
          <i class="fas fa-star">{{ rating }}</i></span
        >
      </div>
      <span>{{ ratingLength }}</span>
      <span class="underTitle-addres">{{ stay.loc.address }}</span>
      <div class="stay-page-container">
        <div
          class="stay-page-img-container"
          v-for="(url, index) in stay.imgUrls"
          :key="index"
        >
          <img :src="url" alt="imgUrl" :class="'img img' + index" />
        </div>
      </div>
    </div>
    <!-- Rigth-Side -->
    <div class="right-side-container">
      <div class="right-side">
        <div class="stay-page-summary">
          <h3>summary:</h3>
          <p>{{ stay.summary }}</p>
        </div>
        <div class="stay-page-accommodates">
          <div class="" aria-hidden="true">
            <span
              class=""
              v-for="n in stay.accommodates"
              :key="n"
              style="margin: 10px"
            >
              <svg
                viewBox="0 0 24 24"
                role="presentation"
                aria-hidden="true"
                focusable="false"
                style="height: 24px; width: 24px; fill: currentcolor"
              >
                <path
                  d="m23.96 14.81-2.96-7.41v-5.02a1.39 1.39 0 0 0 -1.39-1.38h-15.22c-.77 0-1.39.62-1.39 1.38v5.02l-2.96 7.41-.04.19v5.61c0 .64.43 1.17 1.01 1.33 0 .02-.01.04-.01.06v1.5a.5.5 0 0 0 1 0v-1.5h20v1.5a.5.5 0 0 0 1 0v-1.5c0-.02-.01-.04-.01-.06a1.39 1.39 0 0 0 1.01-1.33v-5.61zm-19.96-12.43c0-.21.17-.38.39-.38h15.22a.39.39 0 0 1 .39.39v4.61h-1v-1.61c0-.77-.62-1.39-1.39-1.39h-3.21c-.78 0-1.4.62-1.4 1.39v1.61h-2v-1.61c0-.77-.62-1.39-1.39-1.39h-3.22c-.77 0-1.39.62-1.39 1.39v1.61h-1zm14 3.01v3.21a.39.39 0 0 1 -.39.39h-3.21a.39.39 0 0 1 -.4-.38v-3.22a.39.39 0 0 1 .39-.39h3.21a.39.39 0 0 1 .39.39zm-8 0v3.21a.39.39 0 0 1 -.39.4h-3.22a.39.39 0 0 1 -.39-.39v-3.22a.39.39 0 0 1 .39-.39h3.21a.39.39 0 0 1 .39.39zm-6.16 2.61h1.16v.61c0 .77.62 1.39 1.39 1.39h3.21c.78 0 1.4-.62 1.4-1.39v-.61h2v .61c0 .78.62 1.39 1.39 1.39h3.21c.78 0 1.4-.62 1.4-1.39v-.61h1.16l2.8 7h-21.92zm19.16 12.61c0 .21-.18.39-.39.39h-21.22a.39.39 0 0 1 -.39-.39v-4.61h22z"
                  fill-rule="evenodd"
                ></path></svg
            ></span>
          </div>
          <div class="" v-if="accommodatesLength">
            Accommodates to: {{ accommodatesLength }}
          </div>
        </div>
        <div class="stye-page-amenities-container">
          <div
            class="stye-page-amenities"
            v-for="(amenitie, index) in stay.amenities"
            :key="index"
          >
            <div class="amenitie">{{ amenitie }}</div>
          </div>
        </div>
      </div>
      <!-- {{ stay }} -->
    </div>
    <div class="check-out">
      <div class="price"></div>
      <div class="rate"></div>
      </div>
  </div>
</template>
<style lang="scss">
.stay {
  max-width: 1210px;
  margin:0 auto;
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
    max-width: 70%;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    gap: 15px 10px;
    grid-template-areas:
      "img0 img0 img1 img2"
      "img0 img0 img3 img4";
    .stay-page-img-container:nth-child(1) {
      grid-column: 1/3;
      grid-row: 1/3;
      // border-radius: 15px 0 0 15px;
      .img0 {
        border-radius: 15px 0 0 15px;
      }
    }
     .img:hover{
       filter: brightness(90%);
       cursor: pointer;
     }
    .stay-page-img-container {
      width: 100%;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      .img0 {
        grid-row: 1/3;
        grid-column: 1/3;
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
  .right-side-container {
    float: left;
    .right-side > * {
      margin: 80px;
    }
    .stay-page-accommodates {
      border: 1px rgba(59, 56, 56, 0.795) solid;
      padding: 10px;
      border-radius: 10px;
      display: flex;
      flex-direction: column;
      height: 200px;
      text-align: center;
      > * {
        padding: 15px;
      }
    }
  }
}
</style>
<script>
// @ is an alias to /src
export default {
  name: "Stay",
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
      const addS = reviewsLength > 1 ? "s" : "";
      const string = reviewsLength + " Review" + addS;
      return string;
    },
    accommodatesLength() {
      const accommodatesLength = this.stay.accommodates;
      const addS = accommodatesLength > 1 ? "s" : "";
      const string = accommodatesLength + " partner" + addS;
      return string;
    },
  },
  components: {},
  created() {
    const { stayId } = this.$route.params;
    console.log("stayId", stayId);
    this.stayId = stayId;
    this.$store.dispatch({ type: "stay/load" }).then(() => {
      this.$store.dispatch({ type: "stay/getById", stayId }).then((stay) => {
        this.stay = stay;
      });
    });
  },
};
</script>
