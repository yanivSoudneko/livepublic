<template>
  <section class="container-back-office">
    <!-- <nav-filter /> -->
    <div class="back-office">
      <div class="host-details flex j-around a-center">
        <h2 class="title-hello-user">Greetings Mr/Mrs {{ user.fullname }}</h2>
      </div>
      <div class="host-image flex j-center">
      <img :src="user.imgUrl" :alt="user.fullname" />
      </div>
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
						<div class="stay-card" v-if="doneFetchingStays">
							<backoffice-card
								v-for="(stay, index) in stays"
								:key="index"
								:stay="stay"
								:orders="orders"
							/>
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
import { socketService } from "../services/socket.service";
import navFilter from "../cmps/navFilter.cmp";
import backofficeCard from "../cmps/backoffice-card.cmp";
import orderList from "../cmps/backoffice-table.cmp";
export default {
	name: "Back-Office",
	data() {
		return { orders: [], stays: [], doneFetchingStays: false };
	},
	computed: {
		user() {
			return this.$store.getters["user/user"];
		},
	},
	methods: {
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
				.then(async (orders) => {
					try {
						this.orders = orders;
						const stayIdArr = orders.map((order) => order.stay._id);
						var unique = stayIdArr.filter(
							(value, index, self) =>
								self.indexOf(value) === index
						);

						unique.forEach(async (stayId) => {
							const stay = await this.$store.dispatch({
								type: "stay/getById",
								stayId,
							});
							this.stays.push(stay);
						});
					} catch (error) {
						console.log(
							"🚀 ~ file: backOffice.vue ~ line 78 ~ getOrders ~ error",
							error
						);
					}
				});
		},
	},
	watch: {
		stays() {
			this.doneFetchingStays = false;
			this.doneFetchingStays = true;
		},
	},
	created() {
		this.$store.commit({
			type: "toggleHeroImage",
			toggleShow: false,
		});

		this.getOrders();

		socketService.on(this.user._id, (data) => {
			console.log("host data", data);
			// socketService.emit("join-reservation-chat", data.order._id);
			this.getOrders();
			const { order } = data;
			console.log(
				"🚀 ~ file: backOffice.vue ~ line 124 ~ socketService.on ~ order",
				order
			);
			this.$message({
				dangerouslyUseHTMLString: true,
				message: `<strong>${order.buyer.fullname} wants to reserve your house ${order.stay.name}</strong>`,
			});
		});
	},
	components: {
		navFilter,
		orderList,
		backofficeCard,
	},
};

</script>
