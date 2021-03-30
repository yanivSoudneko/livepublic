<template>
  <div class="check-out">
    <div class="check-header">
      <div class="price">
        <span class="amount">${{ stay.price }}</span>
        <span>/night</span>
      </div>
      <div class="rate">
        <span
          ><i class="fas fa-star">{{ rating }}</i></span
        >
        <span>{{ ratingLength }}</span>
      </div>
    </div>
    <form @submit.prevent="checkout">
      <div class="checkout-input">
        <!-- <input type="date" :min="new Date()" v-model="order.checkIn" />
        <input type="date" :min="new Date()" v-model="order.checkOut" /> -->
        <date-picker placeholder="Check In" @emitDate="setDates($event)" />
        <div class="guest-count">
          <input
            class="guest-input"
            type="number"
            :min="1"
            placeholder="Guests"
            :v-show="order.gueset"
            v-model="order.gueset"
          />
        </div>
        <button class="check" @mousemove="recordPos" :style="{ backgroundImage: calculatedPos }">
          Check Availability
        </button>
      </div>
    </form>
  </div>
</template>

<style lang="scss">
.check-out {
  position: relative;
  right: -564px;
  margin-top: 48px;
  float: right;
  width: 330px;
  border: 1px solid #dddddd;
  border-radius: 12px;
  padding: 24px;
  box-shadow: rgb(0 0 0 / 35%) 0px 6px 16px;
  float: right;
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

    transition: box-shadow 0.2s ease 0s, -ms-transform 0.1s ease 0s, -webkit-transform 0.1s ease 0s,
      transform 0.1s ease 0s !important;
    border: none !important;
    background: linear-gradient(to right, rgb(230, 30, 77) 0%, rgb(227, 28, 95) 50%, rgb(215, 4, 102) 100%);
    color: white;
  }
  .amount {
    font-weight: 700;
  }
}
</style>

<script>
import datePicker from '../cmps/datepicker.cmp';
export default {
  props: {
    stay: {
      // type: Object,
      // Request,
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
        gueset: 1,
      },
    };
  },
  methods: {
    recordPos(ev) {
      const { layerX, layerY } = ev;
      this.mouseX = layerX;
      this.mouseY = layerY;
    },
    checkout() {
      // this.order.gueset is String !!
      console.log(this.order.checkIn);
      console.log(this.order.checkOut);
      console.log(+this.order.gueset);
      this.order.gueset = +this.order.gueset;
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
      return rateTotal / reviews.length;
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
