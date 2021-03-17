import stayJson from '../../data/stayMockData.json';
export default {
    namespaced: true,
    state: { stays: [] },
    getters: {
        getStays(state) {
            return state.stays;
        },
    },
    mutations: {
        load(state, { stays }) {
            state.stays = stays;
        },
    },
    actions: {
        load({ commit }) {
            commit({ type: 'loadStays', stays: stayJson });
        },
    },
};
