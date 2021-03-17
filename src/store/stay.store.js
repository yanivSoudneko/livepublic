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
        loadStays(state, { stays }) {
            state.stays = stays;
        },
    },
    actions: {
        loadStays({ commit }) {
            commit({ type: 'loadStays', stays: stayJson });
        },
    },
};
