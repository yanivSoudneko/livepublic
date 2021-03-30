<template>
  <div class="check-out" :style="{ top: stickyYPos }">
    <div class="check-header">
      <div class="price">
        <span class="amount">${{ stay.price }}</span>
        <span>/</span>
        <span class="nights-count">night</span>
      </div>
      <div class="rate">
        <i class="fas fa-star"></i><span>{{ rating }}</span>
        &nbsp;
        <small class="review-length">({{ ratingLength }})</small>
      </div>
    </div>

    <form @submit.prevent="setOrderDetails" @click="showSummary = false">
      <div class="checkout-input">
        <!-- dates -->
        <date-picker placeholder="Check In" @emitDate="setDates($event)" />
        <!-- guest count -->
        <div class="guest-count">
          <input
            placeholder="Guests"
            type="number"
            :v-show="order.guest"
            v-model="order.guest"
            :max="stay.accommodates"
          />
        </div>
      </div>
      <button class="check" v-if="!showSummary" @mousemove="recordPos" :style="{ backgroundImage: gradient }">
        Check Availability
      </button>
    </form>

    <div v-if="showSummary" class="details-check-availability">
      <button class="check" @click="saveOrder" @mousemove="recordPos" :style="{ backgroundImage: gradient }">
        Reserve
      </button>
      <div class="not-charged">
        <small>You won't be charged yet</small>
      </div>
      <div class="order-price flex j-between">
        <p class="order-price-total">${{ stay.price }} x {{ orderDays }}</p>
        <p>${{ order.totalPrice }}</p>
      </div>
      <div class="cleaning-fee flex j-between">
        <p class="cleaning-fee-txt">Cleaning fee</p>
        <p>${{ cleaningFee }}</p>
      </div>
      <div class="service-fee flex j-between">
        <p class="service-fee-txt">Service fee</p>
        <p>$0</p>
      </div>
      <div class="last-price flex j-between">
        <p>Total</p>
        <p>${{ sum }}</p>
      </div>
      <!-- <h5>{{ stay.name }}</h5>
      <h6 v-if="checkInDetails">Check In: {{ checkInDetails }}</h6>
      <h6 v-if="checkOutDetails">Check Out: {{ checkOutDetails }}</h6>
      <h6 v-if="orderGuest">{{ orderGuest }}</h6>
      <h6 v-if="orderDays">{{ orderDays }}</h6>
      <img v-if="getImg" :src="getImg" alt="HomeImg" /> -->
    </div>
  </div>
</template>

<style lang="scss">
.check-out {
  margin-top: 48px;
  float: right;
  position: sticky;
  display: block;
  top: 25px;
  border: 1px solid #dddddd;
  border-radius: 12px;
  padding: 24px;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 6px 16px;
  max-width: 350px;
  .check-header {
    display: flex;
    justify-content: space-between;
    padding-bottom: 7px;
    .price {
      .amount {
        font-weight: 700;
        padding-right: 5px;
      }
      .nights-count {
        padding-left: 3px;
        color: grey;
      }
    }
  }
  .check {
    cursor: pointer;
    font-size: 16px !important;
    line-height: 20px !important;
    font-weight: 600 !important;
    border-radius: 8px !important;
    outline: none !important;
    padding: 14px 24px !important;
    margin-top: 15px;
    width: 100%;
    // background-position: calc((100 - var(--mouse-x, 0)) * 1%) calc((100 - var(--mouse-y, 0)) * 1%);
    // --mouse-x: 85.3438;
    // --mouse-y: 52.9412;
    transition: box-shadow 0.2s ease 0s, -ms-transform 0.1s ease 0s, -webkit-transform 0.1s ease 0s,
      transform 0.1s ease 0s !important;
    border: none !important;
    // background: linear-gradient(
    //   to right,
    //   rgb(230, 30, 77) 0%,
    //   rgb(227, 28, 95) 50%,
    //   rgb(215, 4, 102) 100%
    // );
    background-image: linear-gradient(
      circle at center center,
      rgb(255, 56, 92) 0%,
      rgb(230, 30, 77) 27.5%,
      rgb(227, 28, 95) 40%,
      rgb(215, 4, 102) 57.5%,
      rgb(189, 30, 89) 75%,
      rgb(189, 30, 89) 100%
    ) !important;
    color: white;
  }
  .details-check-availability {
    display: flex;
    flex-direction: column;
    // align-items: flex-start;
    width: 100%;

    img {
      max-height: 150px;
      max-width: 150px;
      align-self: flex-end;
      position: absolute;
      bottom: 90px;
    }
  }
  .total-price {
    width: 100%;
  }
  .guest-count {
    input {
      height: 56px !important;
      width: 100% !important;
      border: none !important;
      outline: none !important;
      margin: 0px !important;
      padding: 26px 36px 10px 12px !important;
      background-color: transparent !important;
      color: inherit !important;
      font-family: inherit !important;
      font-size: inherit !important;
      font-weight: inherit !important;
      line-height: inherit !important;
      appearance: none !important;
      cursor: pointer !important;
      overflow: hidden !important;
      text-overflow: ellipsis !important;
      white-space: nowrap !important;
      // border: 1px solid grey !important;
      // border-bottom-left-radius: 10px;
      // border-bottom-right-radius: 10px;
      border-top: 1px solid grey !important;

      *,
      *:before,
      *:after {
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
      }
    }
  }
  .checkout-input {
    border: 1px solid grey;
    border-radius: 10px;
  }
  .cleaning-fee,
  .service-fee,
  .last-price {
    font-weight: 400;
    color: rgb(34, 34, 34);
    text-align: left;
  }
  .cleaning-fee-txt,
  .service-fee-txt,
  .order-price-total {
    padding-bottom: 12px;
    text-decoration: underline;
  }

  .order-price {
    margin-top: 24px;
  }

  .last-price {
    border-top: 1px solid rgb(221, 221, 221);
    list-style-type: none;
    margin: 16px 0px 0px;
    padding: 24px 0px 12px;
    font-weight: 700;
    font-size: 20px;
  }
  .not-charged {
    padding-bottom: 5px;
    padding-top: 8px;
    margin: 0 auto;
    color: rgb(34, 34, 34);
  }
  .review-length {
    font-weight: 100;
    color: grey;
  }
}
</style>

<script>
import moment from 'moment';
import datePicker from '../cmps/datepicker.cmp';
import { socketService } from '../services/socket.service';

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
      sum: null,
      // modalShowen:false,
      order: {
        checkIn: null,
        checkOut: null,
        guest: 1,
        days: 1,
        totalPrice: 0,
        by: {},
      },
      cleaningFee: 25,
      showSummary: false,
      scrollPosition: null,
    };
  },
  methods: {
    saveOrder() {
      this.order.by = this.$store.getters['user/user'];
      console.log('🚀 ~ file: checkOut.vue ~ line 159 ~ saveOrder ~ this.order.by', this.order.by);
      if (!this.order.by._id) {
        console.error('cannot get user data');
        return;
      }
      this.order.guest = +this.order.guest;
      // this.$emit("checkout", this.order);

      const order = {
        buyer: this.$store.getters['user/user'],
        host: this.stay.host,
        checkIn: this.order.checkIn,
        checkOut: this.order.checkOut,
        guests: this.order.guest,
        status: 'pending',
        totalPrice: this.sum,
        stay: {
          _id: this.stay._id,
          name: this.stay.name,
          price: this.stay.price,
        },
      };
      console.log('order:', order);
      this.$store.dispatch({ type: 'order/saveOrder', order }).then(newOrder => {
        console.log('CheckOut Check', newOrder);

        socketService.emit('reservation-created', {
          host: this.stay.host,
          guest: this.user,
          order: newOrder,
        });
        this.showSummary = !this.showSummary;
      });
    },
    calcPricePerDays() {
      if (this.order.checkIn && this.order.checkOut) {
        const { checkIn, checkOut } = this.order;
        var a = moment(checkIn);
        var b = moment(checkOut);
        this.order.days = b.diff(a, 'days') || 1;
        this.order.totalPrice = this.order.days * this.stay.price;
        this.sum = this.order.totalPrice + this.cleaningFee;
        console.log(this.sum);
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
    },
    updateScroll() {
      this.scrollPosition = window.scrollY;
    },
    confirmReservation(data) {
      console.log(data);
    },
    showOrderStatus(data) {
      const order = data;
      status = order.status === 'active' ? 'approved' : 'declined';
      this.$message({
        dangerouslyUseHTMLString: true,
        message: `<strong>${order.host.fullname} has ${status} your reservation for ${order.stay.name}</strong>`,
      });
    },
  },
  computed: {
    orderGuest() {
      const guestLength = this.order.guest;
      const addS = guestLength > 1 ? 's' : '';
      const string = ' Guest' + addS + ':' + guestLength;
      return string;
    },
    orderDays() {
      const orderDaysLength = this.order.days;
      console.log(orderDaysLength);
      const addS = orderDaysLength > 1 ? 's' : '';
      const string = orderDaysLength + ' night' + addS;
      return string;
    },
    getImg() {
      return this.stay.imgUrls[0];
    },
    checkInDetails() {
      const time = this.order.checkIn.getTime();
      const format = moment(time).format('dddd, MMMM Do YYYY');
      return format;
    },
    checkOutDetails() {
      const time = this.order.checkOut.getTime();
      const format = moment(time).format('dddd, MMMM Do YYYY');
      return format;
    },
    stickyYPos() {
      return this.scrollPosition;
    },
    gradient() {
      return `radial-gradient(at ${this.mouseX}% 100%, rgb(255, 56, 92) 0%,rgb(230, 30, 77) 27.5%, rgb(227, 28, 95) 40%, rgb(215, 4, 102) 57.5%, rgb(189, 30, 89) 75%, rgb(189, 30, 89) 100%)`;
      // radial-gradient(circle at center center, rgb(255, 56, 92) 0%, rgb(230, 30, 77) 27.5%, rgb(227, 28, 95) 40%, rgb(215, 4, 102) 57.5%, rgb(189, 30, 89) 75%, rgb(189, 30, 89) 100%) !important
    },
    rating() {
      return (this.stay.review_scores.review_scores_rating / 20).toFixed(1);
    },
    ratingLength() {
      const reviewsLength = this.stay.reviews.length;
      const addS = reviewsLength > 1 ? 's' : '';
      const string = reviewsLength + ' Review' + addS;
      return reviewsLength;
    },
    user() {
      return this.$store.getters['user/user'];
    },
  },
  components: { datePicker },
  created() {
    socketService.on('reservation-created', this.confirmReservation);
  },
  mounted() {
    socketService.on(this.user._id, this.showOrderStatus);
    window.addEventListener('scroll', this.updateScroll);
  },
  destroyed() {
    socketService.on('reservation-created', this.confirmReservation);
    socketService.off(this.user._id, this.showOrderStatus);
    window.removeEventListener('scroll', this.updateScroll);
  },
};
</script>
