<template>
  <section class="container-back-office">
    <!-- <nav-filter NEED TO RETURN NAV-FILTER!!! /> -->
    <div class="back-office">
      <div class="host-details flex j-around a-center">
        <h2 class="title-hello-user">Greetings Mr/Mrs {{ user.fullname }}</h2>
        <img :src="user.imgUrl" :alt="user.fullname" />
      </div>
      <div class="top-section">
        <div class="reservations">
          <h2>Pending/Accepted Reservations</h2>
          <div class="reservation-list">
            <div class="stay">
              <hr />
              <table class="table-details-stays" style="border:1px solid black; margin:15px; padding:15px;">
                <th>Stay Name</th>
                <th>Order Id</th>
                <th>CheckIn</th>
                <th>CheckOut</th>
                <th>Guests</th>
                <th>Status</th>
                <th>Price</th>
                <th>Actions</th>
                <tr class="tr-details-stays" v-for="order in orders" :key="order._id">
                  <td>{{ order.stay.name }}</td>
                  <td>{{ order._id }}</td>
                  <td>{{ order.checkIn }}</td>
                  <td>{{ order.checkOut }}</td>
                  <td>{{ order.guests }}</td>
                  <td>{{ order.status }}</td>
                  <td>{{ order.stay.price }}</td>
                  <td class="flex">
                    <button @click="orderStatus(order, 1)">Accept</button>
                    <button @click="orderStatus(order, 0)">Reject</button>
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </div>
        <hr />
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
          <hr />
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
    orderStatus(order, status) {
      if (status === 1) {
        order.status = 'active';
      } else if (status === 0) {
        order.status = 'reject';
      }
      this.$store.dispatch({ type: 'order/updateOrder', order });
    },
    getOrders() {
      this.$store
        .dispatch({
          type: 'order/fetchFiltered',
          filterBy: {
            hostId: this.user._id,
            guestId: this.user._id,
            size: 20,
          },
        })
        .then(orders => (this.orders = orders || []));
    },
  },
  created() {
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
  components() {
    navFilter;
  },
};
</script>
