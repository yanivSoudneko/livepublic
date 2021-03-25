import userJson from '../../data/userMockData.json';
export default {
  namespaced: true,
  state: { user: { _id: 'u101', fullname: 'Guest', imgUrl: 'https://randomuser.me/api/portraits/men/48.jpg' } },
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
