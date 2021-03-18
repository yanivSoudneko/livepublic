import { stayService } from '../services/stay.service';
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
    },
    mutations: {
        loadStays(state, { stays }) {
            state.stays = stays;
        },
        loadLocations(state, { locations }) {
            state.locations = locations;
        },
        setStay({ stays }, { stay }) {
            const idx = stays.findIndex((s) => s._id === stay._id);
            if (idx === -1) {
                console.error('🚀 ~  STORE ERROR STAY IDX NOT FOUND', idx);
                return;
            }
            stays = stay;
        },
    },
    actions: {
        async load({ commit }) {
            try {
                const stays = await stayService.queryStays();
                const locations = await stayService.queryLocations();
                commit({ type: 'loadStays', stays });
                commit({ type: 'loadLocations', locations });
            } catch (error) {
                console.log(
                    '🚀 ~ STORE ERROR STAY stay.store.js ~ line 30 ~ load ~ error',
                    error
                );
            }
        },
        async getById({ commit, state }, { stayId }) {
            try {
                const stay = await stayService.getStayById(stayId);
                commit({ type: 'setStay', stay });
                return stay;
            } catch (error) {
                console.error(
                    '🚀 ~ STORE ERROR STAY stay.store.js ~ line 43 ~ getById ~ error',
                    error
                );
            }
        },
    },
};
