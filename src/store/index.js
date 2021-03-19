import Vue from 'vue';
import Vuex from 'vuex';

import userStore from './user.store';
import orderStore from './order.store';
import stayStore from './stay.store';
import tripStore from './trip.store';

Vue.use(Vuex);

export default new Vuex.Store({
  state: { showHeroImage: false },
  mutations: {
    toggleHeroImage(state, { toggleShow }) {
      state.showHeroImage = toggleShow;
    },
  },
  getters: {
    showHeroImage({ showHeroImage }) {
      return showHeroImage;
    },
  },
  modules: {
    user: userStore,
    order: orderStore,
    stay: stayStore,
    tripStore,
  },
});
