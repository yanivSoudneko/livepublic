import { orderService } from '../services/order.service.js';
export default {
  namespaced: true,
  state: { orders: [] },
  getters: {
    getOrders(state) {
      return state.orders;
    },
  },
  mutations: {
    load(state, { orders }) {
      state.orders = orders;
    },
  },
  actions: {
    async loadOrders({ commit }, payload) {
      try {
        const orders = await orderService.queryOrders();
        commit({ type: 'load', orders });
      } catch (error) {
        console.error('ERROR FETCHING ORDERS:', orders);
      }
    },
    async saveOrder({ commit }, { order }) {
      console.log('payload:', order);
      try {
        console.log('order:', order);
        await orderService.save(order);
      } catch (error) {
        console.error('EROOR SAVE ORDER', error);
      }
    },
  },
};
