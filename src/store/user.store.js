import userJson from '../../data/userMockData.json';
export default {
    namespaced: true,
    state: { user: [] },
    getters: {
        getusers({ user }) {
            return user;
        },
    },
    mutations: {
        load(state, { user }) {
            state.user = user;
        },
    },
    actions: {
        loadStays({ commit }) {
            commit({ type: 'load', user: userJson });
        },
    },
};
