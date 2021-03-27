import { stayService } from '../services/stay.service';
export default {
  namespaced: true,
  state: {
    stays: [],
    locations: [],
    filterBy: {
      filterTxt: '',
      checkIn: new Date(),
      checkOut: new Date(),
      guestCount: 1,
      type: '',
      page: 0,
      size: 4,
    },
  },
  getters: {
    getStays(state) {
      return state.stays;
    },
    getLocations(state) {
      return state.locations;
    },
  },
  mutations: {
    loadStays(state, { stays }) {
      state.stays = stays;
    },
    loadLocations(state, { locations }) {
      state.locations = locations;
    },
    setStay({ stays }, { stay }) {
      console.log('🚀 ~ file: stay.store.js ~ line 33 ~ setStay ~ stay', stay);
      const idx = stays.findIndex(s => s._id === stay._id);
      if (idx === -1) {
        console.error('🚀 ~  STORE ERROR STAY IDX NOT FOUND', idx);
        return;
      }
      stays.splice(idx, 1, stay);
    },
    setFilterBy(state, { filterBy }) {
      _setFilter(state.filterBy, filterBy);
    },
  },
  actions: {
    async fetchFiltered({ state }, { filterBy }) {
      try {
        _setFilter(state.filterBy, filterBy);
        console.log('🚀 ~ file: stay.store.js ~ line 51 ~ fetchFiltered ~ state.filterBy', state.filterBy);

        const stays = await stayService.queryStays(state.filterBy);
        const output = {
          stays,
          filterBy: JSON.parse(JSON.stringify(state.filterBy)),
        };
        return output;
      } catch (error) {
        console.log('🚀 ~ STORE ERROR STAY stay.store.js ~ line 53 ~ load ~ error', error);
      }
    },
    async loadLocations({ commit }) {
      try {
        const locations = await stayService.queryLocations();
        commit({ type: 'loadLocations', locations });
      } catch (error) {
        console.log('🚀 ~ STORE ERROR STAY stay.store.js ~ line 30 ~ load ~ error', error);
      }
    },
    async getById({ commit }, { stayId }) {
      try {
        const stay = await stayService.getStayById(stayId);
        commit({ type: 'setStay', stay });
        return stay;
      } catch (error) {
        console.error('🚀 ~ STORE ERROR STAY stay.store.js ~ line 43 ~ getById ~ error', error);
      }
    },
    async updateStay({ commit }, { stay }) {
      try {
        const updatedStay = await stayService.update(stay);
        commit({ type: 'setStay', stay: updatedStay });
        return updatedStay;
      } catch (error) {
        console.error('🚀 ~ CRITICAL ERROR LIKE ~line 102 ~ updateStay ~ error', error);
      }
    },
  },
};

function _setFilter(filter, extraFields) {
  if (!filter) {
    filter = {};
  }
  Object.assign(filter, extraFields);
}
