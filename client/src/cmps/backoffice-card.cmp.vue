<template>
  <div class="backoffice-card">
    <el-row>
      <el-col v-for="(o, index) in 1" :key="o" :offset="index > 0 ? 2 : 0">
        <el-card :body-style="{ padding: '0px' }">
          <img :src="stay.imgUrls[0]" class="image" />
          <div style="padding: 14px;">
            <span>{{ stay.name }}</span>
            <ul
              v-for="order in orders"
              :key="order._id"
              style="border:1px solid #a1a1a1;border-radius:20px;text-align:start"
            >
              <li>checkIn: {{ order.checkIn }} checkOut: {{ order.checkOut }}</li>
              <li>price: ${{ order.totalPrice }}</li>
            </ul>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  props: {
    stay: {
      type: Object,
      required: true,
    },
    orders: { type: Array },
  },
  name: 'backoffice-card',
  data() {
    return {
      order: null,
    };
  },
  methods: {},
  computed: {},
  components: {},
  created() {
    // this.orders.map(order => (this.order = order));
  },
};
</script>
