<template>
  <div class="stay-preview">
    <el-carousel :autoplay="false">
      <div
        class="likes"
        :class="{ 'is-liked': likedByUser }"
        @click="toggleLike()"
      >
        <svg
          viewBox="0 0 32 32"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          role="presentation"
          focusable="false"
          class="svg-like"
        >
          <path
            d="m16 28c7-4.733 14-10 14-17 0-1.792-.683-3.583-2.05-4.95-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05l-2.051 2.051-2.05-2.051c-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05-1.367 1.367-2.051 3.158-2.051 4.95 0 7 7 12.267 14 17z"
          ></path>
        </svg>
      </div>
      <el-carousel-item
        class="el-carousel-img"
        v-for="(img, idx) in stay.imgUrls"
        :key="idx"
        autoplay="false"
        trigger="click"
        @click.native="$router.push('stay/' + stay._id)"
      >
        <img
          :src="img"
          style="width: 100%; height: 100%; z-index: -1100"
          class="slider-image"
        />
      </el-carousel-item>
    </el-carousel>

    <!--  -->
    <div class="stay-details" @click="$router.push('stay/' + stay._id)">
      <div class="ratings-data">
        <i class="fas fa-star"></i>{{ rating }} ({{ ratingLength }})
      </div>
      <p class="address">{{ stay.loc.address }}</p>
      <p class="summary">{{ stay.summary }}</p>
      <div>
        <span class="price">${{ stay.price }}</span> / Night
      </div>
    </div>
  </div>
</template>

<script>
import { utilService } from "../services/util.service";
export default {
  name: "stay-preview",
  props: {
    stay: {
      type: Object,
    },
  },
  computed: {
    loggedUser() {
      return this.$store.getters["user/user"];
    },
    likedByUser() {
      return (
        this.loggedUser &&
        this.stay.likes &&
        this.stay.likes.find((like) => like.userId === this.loggedUser._id)
      );
    },
    rating() {
      // const reviews = this.stay.reviews;
      // const rateTotal = reviews.reduce((acc, obj) => {
      //   acc += obj.rate;
      //   return acc;
      // }, 0);
      // const result = (rateTotal / reviews.length).toFixed(1);
      // return result < 4.5 ? utilService.genRand(4.5, 5, 1) : result;
      return (this.stay.review_scores.review_scores_rating / 20).toFixed(1);
    },
    ratingLength() {
      const reviewsLength = this.stay.reviews.length;
      //   const addS = reviewsLength > 1 ? "s" : "";
      const string = reviewsLength;
      return string;
    },
  },
  methods: {
    toggleLike() {
      const userIdx = this.stay.likes.findIndex(
        (like) => like.userId === this.loggedUser._id
      );
      if (userIdx === -1) {
        this.stay.likes.push({ userId: this.loggedUser._id });
      } else {
        this.stay.likes.splice(userIdx, 1);
      }

      this.$store.dispatch({ type: "stay/updateStay", stay: this.stay });
    },
  },
};
</script>


