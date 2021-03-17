import tripJson from '../../data/tripMockData.json';
export default {
    namespaced: true,
    state: { trips: [] },
    getters: {
        getTrips({ trips }) {
            return trips;
        },
    },
    mutations: {
        load(state, { trips }) {
            state.trips = trips;
        },
    },
    actions: {
        loadStays({ commit }) {
            commit({ type: 'load', trips: tripJson });
        },
    },
};
