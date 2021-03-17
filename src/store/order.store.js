import orderJson from '../../data/orderMockData.json';
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
        loadorders({ commit }, payload) {
            commit({ type: 'load', orders: orderJson });
        },
    },
};
