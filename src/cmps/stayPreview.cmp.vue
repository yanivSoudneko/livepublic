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
        <img :src="img" style="width: 100%; height: 100%" class="slider-image" />
      </el-carousel-item>
    </el-carousel>
    <div class="stay-details">
      <div class="ratings-data">
        <i class="fas fa-star"></i>{{ rating }} ({{ ratingLength }})
      </div>
      <p class="address">{{ stay.loc.address }}</p>
      <p class="name">{{ stay.name }}</p>
      <p class="summary">{{ stay.summary }}</p>
      <p class="price">${{ stay.price }}/Night</p>
    </div>
  </div>
</template>
<style lang="scss">
.stay-preview {
  border-radius: 10px;
  border: 2px solid rgb(221, 216, 216);
    padding: 10px;
  .el-carousel{
	  img{
		  border-radius: 10px;
	  }
  }
  .summary {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    width: 85px;
  }
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
.fa-star{color: rgb(235, 100, 100);}
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
    ratingLength() {
      const reviewsLength = this.stay.reviews.length;
      const addS = reviewsLength > 1 ? "s" : "";
      const string = reviewsLength + " Review" + addS;
      return string;
    },
  },
};
</script>

<style>
</style>