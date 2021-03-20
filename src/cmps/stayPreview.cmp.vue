<template>
  <div class="stay-preview">
    <!-- <el-carousel
			:autoplay="false"
			trigger="click"
			@click.native="sendToDetails"
		> -->
    <el-carousel :autoplay="false">
      <div class="likes">
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
        <!-- <path
        d="m16 28c7-4.733 14-10 14-17 0-1.792-.683-3.583-2.05-4.95-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05l-2.051 2.051-2.05-2.051c-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05-1.367 1.367-2.051 3.158-2.051 4.95 0 7 7 12.267 14 17z"
      ></path> -->
      </div>
      <el-carousel-item
        v-for="(img, idx) in stay.imgUrls"
        :key="idx"
        autoplay="false"
        trigger="click"
        width="100%"
        height="100%"
        @click.native="$router.push('stay/' + stay._id)"
      >
        <img
          :src="img"
          style="width: 100%; height: 100%; z-index: -1100"
          class="slider-image"
        />
      </el-carousel-item>
    </el-carousel>
    <!-- <button>Hey</button> -->

    <!--  -->
    <div class="stay-details" @click="$router.push('stay/' + stay._id)">
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
  cursor: pointer;
  box-shadow: -7px 9px 22px -2px rgba(196, 192, 192, 0.4);
  border-radius: 10px;
  border: 2px solid rgb(221, 216, 216);
  padding: 10px;
  .el-carousel {
    img {
      border-radius: 10px;
    }
    .svg-like {
      display: block;
      position: absolute;
      fill: rgba(0, 0, 0, 0.5);
      height: 24px;
      width: 24px;
      stroke: rgb(255, 255, 255);
      stroke-width: 2;
      overflow: visible;
      z-index: 1000;
      top: 5px;
      right: 5px;
    }
  }
  .summary {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    width: 220px;
    line-height: 1.8em;
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
.fa-star {
  color: rgb(235, 100, 100);
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
    ratingLength() {
      const reviewsLength = this.stay.reviews.length;
      const addS = reviewsLength > 1 ? "s" : "";
      const string = reviewsLength + " Review" + addS;
      return string;
    },
  },
};
</script>


