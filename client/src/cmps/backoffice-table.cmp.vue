<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="stay.name" label="Stay" width="240">
    </el-table-column>
    <el-table-column prop="buyer.fullname" label="Name" width="120">
    </el-table-column>
    <el-table-column prop="checkIn" label="check-in" width="120">
    </el-table-column>
    <el-table-column prop="checkOut" label="Check-out" width="120">
    </el-table-column>
    <el-table-column prop="guests" label="Guests" width="120">
    </el-table-column>
    <el-table-column prop="status" label="status" width="120">
    </el-table-column>
    <el-table-column prop="stay.price" label="price" width="120">
    </el-table-column>
    -->
    <el-table-column fixed="right" label="Operations" width="120">
      <template slot-scope="scope">
        <el-button
          @click="orderStatus(scope.$index, scope.row, 1)"
          type="text"
          size="small"
          >Accept</el-button
        >
        <el-button
          @click="orderStatus(scope.$index, scope.row, 0)"
          type="text"
          size="small"
          >Reject</el-button
        >
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import moment from "moment";
export default {
  name: "Table-Info",
  methods: {
    orderStatus(index, scope, status) {
      console.log(
        "🚀 ~ file: backoffice-table.cmp.vue ~ line 35 ~ orderStatus ~ order",
        index,
        scope._id
      );
      console.log(
        "isSame",
        scope === this.orders.find((o) => o._id === scope._id)
      );
      scope.status = status ? "active" : "reject";
      this.$store.dispatch({ type: "order/updateOrder", scope });
    },
  },
  props: {
    orders: { type: Array, required: true },
  },
  data() {
    return {
      tableData: [],
    };
  },
  created() {
    if (this.orders.length) {
      this.tableData = this.orders.map((order) => {
        order.checkIn = moment(order.checkIn).format("MMM Do YY");
        order.checkOut = moment(order.checkOut).format("MMM Do YY");
        return order;
      });
      console.log("order", this.orders[0]);
    }
  },
};
</script>