import stayJson from '../../data/stayMockData.json';
import locationsJson from '../../data/locationsMockData.json';
export default {
  namespaced: true,
  state: { stays: [], locations: [] },
  getters: {
    getStays(state) {
      return state.stays;
    },
    getLocations(state) {
      return state.locations;
    },
    // getById(state){
    //     ret
    // }
  },
  mutations: {
    loadStays(state, { stays }) {
      state.stays = stays;
    },
    loadLocations(state, { locations }) {
      state.locations = locations;
    },
  },
  actions: {
    load({ commit }) {
      commit({ type: 'loadStays', stays: stayJson });
      commit({ type: 'loadLocations', locations: locationsJson });
    },
    getById({ commit, state }, { stayId }) {
      const location = state.stays.filter(stay => stay._id === stayId);
      console.log({ location, stayId, stays: state.stays });
      return location ? location[0] : null;
    },
  },
};
