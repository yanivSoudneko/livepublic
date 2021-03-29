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
		<el-table-column prop="guests" label="Guests" width="100">
		</el-table-column>
		<el-table-column prop="status" label="status" width="120">
		</el-table-column>
		<el-table-column prop="formattedPrice" label="price" width="120">
		</el-table-column>
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
import { socketService } from "../services/socket.service";
import moment from "moment";
export default {
	name: "Table-Info",
	methods: {
		orderStatus(index, scope, status) {
			scope.status = status ? "active" : "reject";
			console.log(
				"🚀 ~ file: backoffice-table.cmp.vue ~ line 46 ~ orderStatus ~ scope",
				scope
			);

			this.$store
				.dispatch({ type: "order/updateOrder", order: scope })
				.then((order) => {
					console.log(
						"🚀 ~ file: backoffice-table.cmp.vue ~ line 54 ~ .then ~ order",
						order
					);
					if (!order) return;
					socketService.emit("order-approval", order);
					this.getOrders();
				})
				.catch((err) => {
					console.error(
						"🚀 ~ file: backoffice-table.cmp.vue ~ line 58 ~ .then ~ err",
						err
					);
				});
		},
		formatOrder(order) {
			console.log(
				"🚀 ~ file: backoffice-table.cmp.vue ~ line 70 ~ formatOrder ~ order",
				order
			);
			const {
				checkIn,
				checkOut,
				totalPrice
			} = order;
			order.formattedPrice = "$" + totalPrice;
			order.checkInFormatted = moment(checkIn).format("MMM Do YY");
			order.checkOutFormatted = moment(checkOut).format("MMM Do YY");
			return order;
		},

		getOrders() {
			// debugger;
			//get orders
			this.$store
				.dispatch({
					type: "order/fetchFiltered",
					filterBy: {
						hostId: this.user._id,
						guestId: this.user._id,
						size: 20,
					},
				})
				.then((orders) => {
					this.tableData = orders.map(this.formatOrder);
				});
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
	computed: {
		user() {
			return this.$store.getters["user/user"];
		},
	},
	watch: {
		orders(newValue) {
			this.tableData = newValue.map((order) => {
				const {
					checkIn,
					checkOut,
					stay: { price },
				} = order;
				order.formattedPrice = "$" + price;
				order.checkInFormatted = moment(checkIn).format("MMM Do YY");
				order.checkOutFormatted = moment(checkOut).format("MMM Do YY");
				return order;
			});
		},
	},
	created() {
		if (this.orders.length) {
			this.tableData = this.orders.map(this.formatOrder);
			console.log("order", this.orders[0]);
		}
	},
};
</script>
