import { orderService } from '../services/order.service.js';
import { utilService } from '../services/util.service.js';
export default {
  namespaced: true,
  state: {
    orders: [],
    filterBy: {
      page: 0,
      size: 1,
      stayId: null,
      hostId: null,
      guestId: null,
    },
  },
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
    async updateOrder({ commit }, { order }) {
      try {
        const res = await orderService.updateOrder(order);
        return res;
      } catch (err) {
        console.error('Cant Update Order', err);
      }
    },
    async fetchFiltered({ commit, state }, { filterBy }) {
      try {
        utilService.buildFilter(state.filterBy, filterBy);
        const orders = await orderService.query(state.filterBy);
        commit({ type: 'load', orders });
        return orders;
      } catch (error) {
        console.error('ERROR FETCHING ORDERS:', error);
      }
    },
    async saveOrder({ commit }, { order }) {
      try {
        const newOrder = await orderService.save(order);
        return newOrder;
      } catch (error) {
        console.error('EROOR SAVE ORDER', error);
      }
    },
  },
};
