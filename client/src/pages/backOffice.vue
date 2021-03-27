<template>
  <section class="container-back-office">
    <nav-filter />
    <div class="back-office">
      <div class="host-details flex j-around a-center">
        <h2 class="title-hello-user">Greetings Mr/Mrs {{ user.fullname }}</h2>
        <img :src="user.imgUrl" :alt="user.fullname" />
      </div>
      <div class="top-section">
        <div class="reservations">
          <h2>Pending/Accepted Reservations</h2>
          <div class="reservation-list">
            <div class="stay" v-for="order in orders" :key="order._id">
              {{ order }}
              <hr />
              <!-- {{ order._id }} -->
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
  created() {
    this.$store.commit({
      type: 'toggleHeroImage',
      toggleShow: false,
    });
    this.$store
      .dispatch({
        type: 'order/fetchFiltered',
        filterBy: { hostId: this.user._id, guestId: this.user._id, size: 20 },
      })
      .then(orders => (this.orders = orders || []));
    this.$store
      .dispatch({
        type: 'stay/fetchFiltered',
        filterBy: { hostId: this.user._id, size: 5 },
      })
      .then(data => {
        console.log('🚀 ~ file: backOffice.vue ~ line 74 ~ .then ~ stays', data.stays);

        this.stays = data.stays || [];
      });
  },
  components() {
    navFilter;
  },
};
</script>
