<template>
  <div class="check-out">
    <div class="check-header">
      <div class="price">${{ stay.price }}/night</div>
      <div class="rate">
        <span
          ><i class="fas fa-star">{{ rating }}</i></span
        >&nbsp;
        <span>{{ ratingLength }}</span>
      </div>
    </div>

    <form @submit.prevent="setOrderDetails" @click="showSummary = false">
      <div class="checkout-input">
        <!-- dates -->
        <date-picker placeholder="Check In" @emitDate="setDates($event)" />
        <!-- guest count -->
        <div class="guest-count">
          <input
            type="number"
            placeholder="Guests"
            :v-show="order.guest"
            v-model="order.guest"
            min="1"
            :max="stay.accommodates"
          />
        </div>
        <button class="check" v-if="!showSummary" @mousemove="recordPos" :style="{ backgroundImage: calculatedPos }">
          Check Availability
        </button>
      </div>
    </form>

    <div v-if="showSummary">
      <h4>Details</h4>
      <pre>{{ order }}</pre>
      <button class="check">Summary</button>
    </div>
  </div>
</template>

<style lang="scss">
.check-out {
  // position: fixed;
  position: sticky;
  top: 0;
  //////
  float: right;
  right: 250px;
  margin-top: 55px;
  float: right;
  border: 1px solid rgb(221, 221, 221);
  border-radius: 12px;
  padding: 24px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 6px 16px;
  // display: flex;
  // flex-direction: column;
  // width: 280px;

  .check-header {
    display: flex;
    justify-content: space-between;
  }
  .check {
    cursor: pointer;
    font-size: 16px !important;
    line-height: 20px !important;
    font-weight: 600 !important;
    border-radius: 8px !important;
    outline: none !important;
    padding: 14px 24px !important;
    // background-position: calc((100 - var(--mouse-x, 0)) * 1%) calc((100 - var(--mouse-y, 0)) * 1%);
    // --mouse-x: 85.3438;
    // --mouse-y: 52.9412;
    transition: box-shadow 0.2s ease 0s, -ms-transform 0.1s ease 0s, -webkit-transform 0.1s ease 0s,
      transform 0.1s ease 0s !important;
    border: none !important;
    background: linear-gradient(to right, rgb(230, 30, 77) 0%, rgb(227, 28, 95) 50%, rgb(215, 4, 102) 100%);
    color: white;
  }
}
</style>

<script>
import moment from 'moment';
import datePicker from '../cmps/datepicker.cmp';
export default {
  props: {
    stay: {
      type: Object,
      Request,
    },
  },
  name: 'checkOut',
  data() {
    return {
      mouseX: 0,
      mouseY: 0,
      order: {
        checkIn: null,
        checkOut: null,
        guest: 1,
        days: 1,
        totalPrice: 0,
      },
      showSummary: false,
    };
  },
  methods: {
    calcPricePerDays() {
      if (this.order.checkIn && this.order.checkOut) {
        const { checkIn, checkOut } = this.order;
        var a = moment(checkIn);
        var b = moment(checkOut);
        this.order.days = b.diff(a, 'days') || 1;
        this.order.totalPrice = this.order.days * this.stay.price;
      }
    },
    setDates(ev) {
      this.order.checkIn = ev[0];
      this.order.checkOut = ev[1];
    },
    recordPos(ev) {
      const { layerX, layerY } = ev;
      this.mouseX = layerX;
      this.mouseY = layerY;
    },
    setOrderDetails() {
      // this.order.guest is String !!
      this.calcPricePerDays();
      this.showSummary = true;
      console.log({ order: this.order });
      return;
      this.order.guest = +this.order.guest;
      this.$emit('checkout', this.order);
    },
  },
  computed: {
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
      const addS = reviewsLength > 1 ? 's' : '';
      const string = reviewsLength + ' Review' + addS;
      return string;
    },
  },
  components: { datePicker },
  created() {},
};
</script>
