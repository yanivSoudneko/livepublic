<template>
  <div class="stay" v-if="stay">
    <h2>{{ stay.name }}</h2>
    <div class="stay-page-sub-header">
      <div class="rating">
        <span class="sub-review">
          <i class="fas fa-star"></i><span class="rate">{{ rating }}</span>
        </span>
        <small>({{ ratingLength }})</small>&nbsp;<span>·</span>&nbsp;
        <span class="underTitle-addres">{{ stay.loc.address }}</span>
      </div>
      <div class="stay-page-container">
        <div class="stay-page-img-container" v-for="(url, index) in stay.imgUrls" :key="index">
          <img :src="url" alt="imgUrl" :class="'img img' + index" />
        </div>
      </div>
    </div>
    <!-- Rigth-Side -->
    <div class="right-side-container">
      <div class="right-side">
        <check-out :stay="stay" @checkout="checkout" />
        <div class="stay-page-summary">
          <div class="host-details flex j-between a-center">
            <div class="about-host">
              <h2>{{ stay.host.fullname }}</h2>
              <span> · </span>
              <span>{{ stay.accommodates }} Guests</span><span> · </span> <span>{{ stay.bedrooms }} bedrooms</span
              ><span> · </span> <span>{{ stay.beds }} beds</span><span> · </span>
              <span>{{ bathRoomText }} </span>
            </div>
            <div class="host-image">
              <img :src="stay.host.imgUrl" />
            </div>
          </div>

          <h3>summary:</h3>
          <p>{{ stay.summary }}</p>
        </div>

        <!-- <div class="stay-page-accommodates">
          <div class="" aria-hidden="true">
            <span class="" v-for="n in stay.accommodates" :key="n" style="margin: 10px">
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
        <h2 class="amenities-header">Amenities</h2>
        <ul class="stay-page-amenities-container">
          <li
            class="stay-page-amenities flex a-center"
            v-for="(amenity, index) in stay.amenities.slice(0, 10)"
            :key="index"
          >
            <!-- {{ amenity }} -->
            <img
              v-if="ammenitiesWithSvg.includes(amenity)"
              class="amenity-img"
              :src="require('@/assets/img/ammenities/' + amenity + '.svg')"
              alt=""
            /><span class="amenities-desc">{{ amenity }}</span>
            <!-- <li class="amenitie">{{ amenitie }}</li> -->
          </li>
        </ul>
      </div>
      <hr />
      <!-- {{reviews}} -->
      <div class="stay-reviews">
        <h3>
          <i class="fas fa-star"></i>{{ stay.review_scores.review_scores_rating }} ({{ stay.reviews.length }}
          reviews)
        </h3>
        <div class="reviews-rate-list">
          <p>Cleanliness</p>
          <el-progress class="progress-bar" :percentage="98" :format="format"></el-progress>
          <p>Communication</p>
          <el-progress class="progress-bar" :percentage="98" :format="format"></el-progress>
          <p>Check-in</p>
          <el-progress class="progress-bar" :percentage="100" :format="format"></el-progress>
          <p>Accuracy</p>
          <el-progress class="progress-bar" :percentage="90" :format="format"></el-progress>
          <p>Location</p>
          <el-progress class="progress-bar" :percentage="90" :format="format"></el-progress>
          <p>Value</p>
          <el-progress class="progress-bar" :percentage="50" :format="format"></el-progress>
        </div>
        <ul class="reviews-grid">
          <li v-for="(review, index) in stay.reviews.slice(0, 8)" :key="index">
            <div class="reviewer-container flex a-center">
              <img :src="review.by.imgUrl" alt="imgUrl" :class="'avatar img' + index" />
              <div>
                <div class="reviewer-name">
                  {{ review.by.fullname }}
                </div>
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
          <el-input type="textarea" :rows="5" placeholder="Please input" v-model="reviewTxt"> </el-input>
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
    <!-- <check-out :stay="stay" @checkout="checkout" /> -->
  </div>
</template>


<script>
// @ is an alias to /src
import { utilService } from '../services/util.service';
import googleMaps from '../cmps/google.maps.cmp';
import checkOut from '../cmps/checkOut.vue';
import stars from '../cmps/stars.cmp';
import moment from 'moment';
export default {
  name: 'Stay',
  data() {
    return {
      stayId: null,
      stay: null,
      index: null,
      //textarea
      reviewTxt: '',
      reviewRating: 1,
      ammenitiesWithSvg: [
        'Air conditioning',
        'Babysitter recommendations',
        'Bathtub',
        'Breakfast',
        'Cable TV',
        'Carbon monoxide alarm',
        'Dedicated workspace',
        'Dryer',
        'Elevator',
        'Essentials',
        'First aid kit',
        'Free parking on premises',
        'Gym',
        'Hair dryer',
        'Hangers',
        'Heating',
        'Hot tub',
        'Indoor fireplace',
        'Iron',
        'Kitchen',
        'Security cameras on property',
        'Smoke alarm',
        'TV',
        'Washer',
        'Wifi',
      ],
    };
  },
  methods: {
    format(percentage) {
      if (percentage === 98) return '4.9';
      else if (percentage === 100) return '5.0';
      else if (percentage === 90) return '4.7';
      else if (percentage === 50) return '2.5';
    },
    convertTimeStamp(time) {
      return moment(time).fromNow(Boolean);
    },
    checkout(orderToSave) {
      const order = {
        buyer: this.$store.getters['user/user'],
        host: this.stay.host,
        createdAt: new Date(),
        startDate: orderToSave.checkIn,
        endDate: orderToSave.checkOut,
        guests: orderToSave.gueset,
        status: 'pending',
        stay: {
          _id: this.stay._id,
          name: this.stay.name,
          price: this.stay.price,
        },
        totalPrice: 160,
      };
      console.log('order:', order);
      this.$store.dispatch({ type: 'order/saveOrder', order }).then(() => console.log('CheckOut Check'));
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
      const { _id, fullname, imgUrl } = this.user;
      const newReview = {
        _id: Date.now() + '_' + _id,
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
          type: 'stay/updateStay',
          stay: this.stay,
        })
        .then(stay => {
          console.log('🚀 ~ file: stayPage.vue ~ line 405 ~ addReview ~ stay', stay);
          this.reviewTxt = '';
          this.reviewRating = 1;
          // this.stay = stay;
        });
    },
    removeReview(reviewId) {
      const idx = this.stay.reviews.findIndex(review => review._id === reviewId);
      if (idx === -1) {
        console.error('not found', idx);
        return;
      }
      this.stay.reviews.splice(idx, 1);
      this.$store
        .dispatch({
          type: 'stay/updateStay',
          stay: this.stay,
        })
        .then(stay => {
          console.log('review removed');
        });
    },
  },
  computed: {
    bathRoomText() {
      const bathNums = this.stay.bathrooms.numberDecimal;
      return bathNums === '1' ? '1 Bathroom' : bathNums + 'Bathrooms';
    },
    // adjustRating() {
    //   const { rating } = this.stay;
    //   return rating < 4 ? 4 : rating;
    // },
    // reviews(){
    //  const reviews = this.stay.reviews.splice(0,8)
    //  return reviews;
    // },
    user() {
      return this.$store.getters['user/user'];
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
      const result = (rateTotal / reviews.length).toFixed(1);
      return result < 4.5 ? utilService.genRand(4.5, 5, 1) : result;
    },
    ratingLength() {
      const reviewsLength = this.stay.reviews.length;
      const addS = reviewsLength > 1 ? 's' : '';
      const string = reviewsLength + ' Review' + addS;
      return string;
    },
    accommodatesLength() {
      const accommodatesLength = this.stay.accommodates;
      const addS = accommodatesLength > 1 ? 's' : '';
      const string = accommodatesLength + ' partner' + addS;
      return string;
    },
  },
  created() {
    const { stayId } = this.$route.params;
    console.log('stayId', stayId);
    this.stayId = stayId;
    this.$store.dispatch({ type: 'stay/getById', stayId }).then(stay => {
      this.stay = stay;
    });
    this.$store.commit({
      type: 'toggleHeroImage',
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
