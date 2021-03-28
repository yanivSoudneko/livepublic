<template>
  <section class="container-back-office">
    <!-- <nav-filter /> -->
    <div class="back-office">
      <div class="host-details flex j-around a-center">
        <h2 class="title-hello-user">Greetings Mr/Mrs {{ user.fullname }}</h2>
      </div>
      <img :src="user.imgUrl" :alt="user.fullname" />
      <div class="top-section">
        <div class="reservations">
          <h2>Pending/Accepted Reservations</h2>
          <order-list v-if="orders.length" :orders="orders" />
        </div>

        <div class="stays-container">
          <div class="header">
            <h2>My Stays(hosting)</h2>
            <a class="host-new-stay">Host New Stay</a>
          </div>
          <div class="hosting-stays">
            <div class="stay" v-for="stay in stays" :key="stay._id">
              {{ stay.name }}
              {{ stay.imgUrl }}
            </div>
          </div>
        </div>

        <div class="host-summary">
          <h2>Host Summary</h2>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { socketService } from '../services/socket.service';
import navFilter from '../cmps/navFilter.cmp';
import orderList from '../cmps/backoffice-table.cmp';
export default {
  name: 'Back-Office',
  data() {
    return { orders: [], stays: [] };
  },
  computed: {
    user() {
      return this.$store.getters['user/user'];
    },
  },
  methods: {
    getOrders() {
      // debugger;
      //get orders
      this.$store
        .dispatch({
          type: 'order/fetchFiltered',
          filterBy: {
            hostId: this.user._id,
            guestId: this.user._id,
            size: 20,
          },
        })
        .then(orders => {
          this.orders = orders;
          this.$forceUpdate();
        });
    },
  },
  created() {
    console.log(orderList);
    this.$store.commit({
      type: 'toggleHeroImage',
      toggleShow: false,
    });

    this.getOrders();
    //get stays
    this.$store
      .dispatch({
        type: 'stay/fetchFiltered',
        filterBy: { hostId: this.user._id, size: 5 },
      })
      .then(data => {
        this.stays = data.stays || [];
      });

    socketService.on(this.user._id, data => {
      console.log('host data', data);
      socketService.emit('join-reservation-chat', data.order._id);
      this.getOrders();
    });
  },
  components: {
    navFilter,
    orderList,
  },
};
</script>
