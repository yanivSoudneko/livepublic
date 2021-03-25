import userJson from '../../data/userMockData.json';
export default {
  namespaced: true,
  state: { user: { _id: '60587461571d864cdcf8921c', fullname: 'Guest', imgUrl: 'https://randomuser.me/api/portraits/men/48.jpg' } },
  getters: {
    user({ user }) {
      return user;
    },
  },
  mutations: {
    load(state, { user }) {
      state.user = user;
    },
  },
  actions: {
    login({ commit }) {
      commit({ type: 'load', user: userJson });
    },
  },
};
