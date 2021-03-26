import { userService } from '../services/user.service';
// import Vue from 'vue';
export default {
    namespaced: true,
    state: {
        user: {
            _id: '60587461571d864cdcf8921c',
            fullname: 'Guest',
            imgUrl: 'https://randomuser.me/api/portraits/men/48.jpg',
        },
        error: '',
    },
    getters: {
        user({ user }) {
            return user;
        },
        error({ error }) {
            return error;
        },
    },
    mutations: {
        setUser(state, { user }) {
            state.user = user;
        },
        setError(state, { error }) {
            state.error = error.error || error;
            // if (state.error) {
            //     Vue.$toast.open({
            //         message: 'error:' + JSON.stringify(error),
            //         type: 'error',
            //     });
            // }
        },
        logout(state, payload) {
            state.user = null;
        },
    },
    actions: {
        async login({ commit }, { user }) {
            try {
                const resUser = await userService.login(user);
                commit({ type: 'setUser', user: resUser });
                return resUser;
            } catch (error) {
                commit({ type: 'setError', error });
            }
        },
        async signup({ commit }, { user }) {
            try {
                const res = await userService.signup(user);
                commit({ type: 'setUser', user: res });
                return true;
            } catch (error) {
                commit({ type: 'setError', error });
            }
        },
        logout({ commit }, payload) {
            console.log('logging out');
            userService.logout();
            commit({ type: 'logout' });
        },
        checkStoredUser({ commit }) {
            const resUser = userService.checkStoredUser();
            if(!resUser) return
            commit({ type: 'setUser', user: resUser });
        },
    },
};
