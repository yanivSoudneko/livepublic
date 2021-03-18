<template>
  <div class="stay-preview">
    <!-- <el-carousel
			:autoplay="false"
			trigger="click"
			@click.native="sendToDetails"
		> -->
    <el-carousel :autoplay="false">
      <el-carousel-item
        v-for="(img, idx) in stay.imgUrls"
        :key="idx"
        autoplay="false"
        trigger="click"
        width="100%"
        height="100%"
        @click.native="$router.push('stay/' + stay._id)"
      >
        <img :src="img" class="slider-image" />
      </el-carousel-item>
    </el-carousel>
    <div class="stay-details">
      <div class="ratings-data"><i class="fas fa-star"></i>{{rating}},({{ratingLength}}Review)</div>
      <p class="name">{{ stay.name }}</p>
    </div>
  </div>
</template>
<style lang="scss">
.stay-preview {
  border-radius: 30px;
}
.el-carousel__indicator {
  button {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    padding: 0;
  }

  &:hover {
    button {
      transition: 70ms;
      transform: scale(1.5);
    }
  }
}
</style>

<script>
export default {
  name: "stay-preview",
  props: {
    stay: {
      type: Object,
    },
  },
  computed: {
    rating() {
      const reviews = this.stay.reviews;
      const rateTotal = reviews.reduce((acc, obj) => {
        acc += obj.rate;
        return acc;
      }, 0);
      return rateTotal / reviews.length;
    },
	ratingLength(){
		const reviewsLength = this.stay.reviews.length
		return reviewsLength
	}
  },
};
</script>

<style>
</style>