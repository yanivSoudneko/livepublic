<template>
  <div class="stay" v-if="stay">
    <h2>{{ stay.name }}</h2>
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
          <div class="host-details flex j-between a-center">
            <div class="about-host">
              <h2>{{ stay.host.fullname }}</h2>
              <span>{{ stay.accommodates }} Guests</span>
            </div>
            <div class="host-image">
              <img :src="stay.host.imgUrl" />
            </div>
          </div>
          <hr />
          <h3>summary:</h3>
          <p>{{ stay.summary }}</p>
        </div>
        <!-- <div class="stay-page-accommodates">
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
                  d="m23.96 14.81-2.96-7.41v-5.02a1.39 1.39 0 0 0 -1.39-1.38h-15.22c-.77 0-1.39.62-1.39 1.38v5.02l-2.96 7.41-.04.19v5.61c0 .64.43 1.17 1.01 1.33 0 .02-.01.04-.01.06v1.5a.5.5 0 0 0 1 0v-1.5h20v1.5a.5.5 0 0 0 1 0v-1.5c0-.02-.01-.04-.01-.06a1.39 1.39 0 0 0 1.01-1.33v-5.61zm-19.96-12.43c0-.21.17-.38.39-.38h25.22a.39.39 0 0 1 .39.39v4.61h-1v-1.61c0-.77-.62-1.39-1.39-1.39h-3.21c-.78 0-1.4.62-1.4 1.39v1.61h-2v-1.61c0-.77-.62-1.39-1.39-1.39h-3.22c-.77 0-1.39.62-1.39 1.39v1.61h-1zm14 3.01v3.21a.39.39 0 0 1 -.39.39h-3.21a.39.39 0 0 1 -.4-.38v-3.22a.39.39 0 0 1 .39-.39h3.21a.39.39 0 0 1 .39.39zm-8 0v3.21a.39.39 0 0 1 -.39.4h-3.22a.39.39 0 0 1 -.39-.39v-3.22a.39.39 0 0 1 .39-.39h3.21a.39.39 0 0 1 .39.39zm-6.16 2.61h2.16v.61c0 .77.62 1.39 1.39 1.39h3.21c.78 0 1.4-.62 1.4-1.39v-.61h2v .61c0 .78.62 1.39 1.39 1.39h3.21c.78 0 1.4-.62 1.4-1.39v-.61h2.16l2.8 7h-21.92zm19.16 12.61c0 .21-.18.39-.39.39h-21.22a.39.39 0 0 1 -.39-.39v-4.61h22z"
                  fill-rule="evenodd"
                ></path></svg
            ></span>
          </div>
          <div class="" v-if="accommodatesLength">
            Accommodates to: {{ accommodatesLength }}
          </div>
        </div> -->
        <ul class="stay-page-amenities-container">
          <li
            class="stay-page-amenities"
            v-for="(amenitie, index) in stay.amenities.slice(0,10)"
            :key="index"
          >
            {{ amenitie }}
            <!-- <li class="amenitie">{{ amenitie }}</li> -->
          </li>
        </ul>
      </div>
      <hr />
      <!-- {{reviews}} -->
      <div class="stay-reviews">
        <h2>Reviews</h2>
        <!-- <ul>
        <div
          class="review-details"
          v-for="(review, index) in stay.reviews"
          :key="index"
        >
          <div class="user-review-avatar">
            <h2>{{ review.by.fullname }}</h2>
            <img
              :src="review.by.imgUrl"
              alt="imgUrl"
              :class="'avatar img' + index"
            />
          </div>
          <div class="user-review-txt">
            <p :class="'para para' + index">{{ review.txt }}</p>
            <button class="pill-pad" @click="readMore">Read More</button>
          </div>
          <button
            class="pill-pad"
            v-if="user._id === review.by._id"
            @click="removeReview(review._id)"
          >
            Remove
          </button>
        </div>
          </ul> -->
        <h3>
          <i class="fas fa-star"></i>{{ houseRating }} ({{ reviewsLength }}
          reviews)
        </h3>
        <div class="reviews-rate-list">
          <p>Cleanliness</p>
          <el-progress
            class="progress-bar"
            :percentage="98"
            :format="format"
          ></el-progress>
          <p>Communication</p>
          <el-progress
            class="progress-bar"
            :percentage="98"
            :format="format"
          ></el-progress>
          <p>Check-in</p>
          <el-progress
            class="progress-bar"
            :percentage="100"
            :format="format"
          ></el-progress>
          <p>Accuracy</p>
          <el-progress
            class="progress-bar"
            :percentage="90"
            :format="format"
          ></el-progress>
          <p>Location</p>
          <el-progress
            class="progress-bar"
            :percentage="90"
            :format="format"
          ></el-progress>
          <p>Value</p>
          <el-progress
            class="progress-bar"
            :percentage="50"
            :format="format"
          ></el-progress>
        </div>
        <ul class="reviews-grid">
          <li v-for="(review, index) in stay.reviews.slice(0, 8)" :key="index">
            <div class="reviewer-container flex a-center">
              <img
                :src="review.by.imgUrl"
                alt="imgUrl"
                :class="'avatar img' + index"
              />
              <div>
                <div class="reviewer-name">{{ review.by.fullname }}</div>
                <div class="review-time">
                  {{ convertTimeStamp(review.createdAt) }}
                </div>
              </div>
            </div>
            <p class="review-text">{{ review.txt }}</p>
          </li>
        </ul>
        <div class="add-review">
          <h1>Add a Review</h1>
          <div class="stars">
            <stars :readOnly="false" @ratingChanged="setReviewRating" />
          </div>
          <el-input
            type="textarea"
            :rows="5"
            placeholder="Please input"
            v-model="reviewTxt"
          >
          </el-input>
          <button @click="addReview">Add</button>
        </div>
      </div>
      <hr />
      <!-- GOOGLE MAPS -->
      <div class="google-map">
        <h2>location:</h2>
        <google-maps :lat="stay.loc.lat" :lng="stay.loc.lng" />
      </div>
      <!-- {{ stay }} -->
    </div>
    <check-out :stay="stay" @checkout="checkout" />
  </div>
</template>
<style lang="scss">
.stay {
  position: relative;
  max-width: 1210px;
  margin: 0 auto;
  .underTitle > * {
    padding: 10px;
  }
  .underTitle > *:first-child {
    padding: 0px;
  }
  .rateing {
    display: inline;
  }
  .underTitle-addres {
    text-decoration: underline;
    color: #0c0c0c;
  }
  .stay-page-container {
    display: grid;
    margin: 0 auto;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: 165px 165px;
    gap: 15px 10px;
    grid-template-areas:
      "img0 img0 img1 img2"
      "img0 img0 img3 img4";
    margin-bottom: 100px;
    height: 330px;
    .stay-page-img-container:nth-child(1) {
      grid-column: 1/3;
      grid-row: 1/3;
      // border-radius: 15px 0 0 15px;
      .img0 {
        border-radius: 15px 0 0 15px;
      }
    }
    .img:hover {
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
        border-top-right-radius: 15px;
      }
      .img3 {
        grid-area: img3;
      }
      .img4 {
        grid-area: img4;
        border-bottom-right-radius: 15px;
      }
    }
  }
  .review-text {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .stay-page-amenities-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    row-gap: 27px;
    width: 60%;
  }
}
.right-side-container {
  // float: left;
  // .right-side > * {
  // }
  //    .host-details{
  //   .about-host{
  //     white-space: pre;
  //     .host-image{
  //       img{
  //         width: 50px;
  //         height: 50px;
  //         border-radius: 50%;
  //       }
  //     }
  //   }
  // }
  .stay-page-accommodates {
    margin: 15px;
    border: 1px rgba(59, 56, 56, 0.795) solid;
    padding: 10px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    height: 200px;
    // max-width: 250px;
    text-align: center;
    > * {
      display: flex;
      justify-content: center;
      align-items: center;
      width: auto;
    }
  }
  .stay-reviews,
  .google-map {
    height: 50vh;
  }
  .stay-reviews {
    margin-top: 85px;
    height: 100%;
    .reviews-grid {
      grid-template-columns: 1fr 1fr;
      -moz-column-gap: 90px;
      column-gap: 90px;
      display: grid;
      row-gap: 50px;
    }
  }
  .host-image {
    img {
      width: 50px;
      border-radius: 50%;
    }
  }
  .user-review-txt {
    .para {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
    }
    .removeP {
      -webkit-line-clamp: unset;
      -webkit-box-orient: unset;
    }
  }
  .user-review-avatar {
    img {
      width: 50px;
      border-radius: 50%;
    }
  }
  .avatar {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    margin-inline-end: 12px;
  }
  .el-progress-bar__inner {
    background-color: #ff385c;
  }
  .reviews-rate-list {
    text-align: left;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    margin-bottom: 20px;
    -moz-column-gap: 10px;
    column-gap: 10px;
  }
}
</style>
<script>
// @ is an alias to /src
import googleMaps from "../cmps/google.maps.cmp";
import checkOut from "../cmps/checkOut.vue";
import stars from "../cmps/stars.cmp";
import moment from "moment";
export default {
  name: "Stay",
  data() {
    return {
      stayId: null,
      stay: null,
      index: null,
      //textarea
      reviewTxt: "",
      reviewRating: 1,
    };
  },
  methods: {
    format(percentage) {
      if (percentage === 98) return "4.9";
      else if (percentage === 100) return "5.0";
      else if (percentage === 90) return "4.7";
      else if (percentage === 50) return "2.5";
    },
    convertTimeStamp(time) {
      return moment(time).fromNow();
    },
    checkout(orderToSave) {
      const { id, fullName, img } = this.user;
      const order = {
        buyer: { _id: id, fullname: fullName },
        createdAt: new Date(),
        endDate: orderToSave.checkOut,
        guests: orderToSave.gueset,
        startDate: orderToSave.checkIn,
        status: "pending",
        stay: {
          _id: this.stay._id,
          name: this.stay.name,
          price: this.stay.price,
        },
        totalPrice: 160,
        _id: null,
      };
      console.log("order:", order);
      this.$store
        .dispatch({ type: "order/saveOrder", order })
        .then(() => console.log("CheckOut Check"));
    },
    readMore(index) {
      const el = `p-${index}`;
      console.log(el);
      // el.classList.add('removeP')
    },
    setReviewRating(ev) {
      console.log({ ev });
      this.reviewRating = ev;
    },
    addReview() {
      console.log({
        reviewTxt: this.reviewTxt,
        reviewRating: this.reviewRating,
        stayReviews: this.stay.reviews,
      });

      // var xx = {
      // 	id: "hg5h4h5",
      // 	txt:
      // 		"Dan was incredibly responsive and very helpful. Super cute condo and everything I needed for a month+ stay. Nice appliances and design throughout and great natural light. Would surely recommend for a short or long stay in lower manhattan.",
      // 	rate: 4.2,
      // 	by: {
      // 		_id: "u109",
      // 		fullname: "Jeanette Fleming",
      // 		imgUrl: "https://randomuser.me/api/portraits/women/13.jpg",
      // 	},
      // };
      const { _id, fullname, imgUrl } = this.user;
      const newReview = {
        _id: Date.now + "_" + _id,
        txt: this.reviewTxt,
        rate: this.reviewRating,
        by: {
          _id,
          fullname,
          imgUrl,
        },
      };

      this.stay.reviews.push(newReview);

      this.$store
        .dispatch({
          type: "stay/updateStay",
          stay: this.stay,
        })
        .then((res) => {
          this.reviewTxt = "";
          this.reviewRating = 1;
        });
    },
    removeReview(reviewId) {
      const idx = this.stay.reviews.findIndex(
        (review) => review._id === reviewId
      );
      if (idx === -1) {
        console.error("not found", idx);
        return;
      }
      this.stay.reviews.splice(idx, 1);
      this.$store
        .dispatch({
          type: "stay/updateStay",
          stay: this.stay,
        })
        .then((stay) => {
          console.log("review removed");
        });
    },
  },
  computed: {
    // reviews(){
    //  const reviews = this.stay.reviews.splice(0,8)
    //  return reviews;
    // },
    user() {
      return this.$store.getters["user/getUser"];
    },
    calculatedPos() {
      return `radial-gradient(at ${this.mouseX}% ${this.mouseY}%, #e61e4d, #9b59b6)`;
    },
    rating() {
      const reviews = this.stay.reviews;
      const rateTotal = reviews.reduce((acc, obj) => {
        acc += obj.rate;
        return acc;
      }, 0);
      return (rateTotal / reviews.length).toFixed(1);
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
  created() {
    const { stayId } = this.$route.params;
    console.log("stayId", stayId);
    this.stayId = stayId;
    this.$store.dispatch({ type: "stay/loadStays" }).then(() => {
      this.$store.dispatch({ type: "stay/getById", stayId }).then((stay) => {
        this.stay = stay;
      });
    });
    this.$store.commit({
      type: "toggleHeroImage",
      toggleShow: false,
    });
  },
  components: {
    checkOut,
    googleMaps,
    stars,
  },
};
</script>
