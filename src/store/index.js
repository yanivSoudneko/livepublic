import Vue from 'vue';
import Vuex from 'vuex';

import userStore from './user.store';
import orderStore from './order.store';
import stayStore from './stay.store';
import tripStore from './trip.store';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
    modules: {
        userStore,
        orderStore,
        stayStore,
        tripStore,
    },
});
