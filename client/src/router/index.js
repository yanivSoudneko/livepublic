import Vue from 'vue';
import VueRouter from 'vue-router';
import homePage from '@/pages/homePage.vue';
import explorePage from '@/pages/explorePage.vue';
import stayDetails from '@/pages/stayDetails.vue';
import stayEdit from '@/pages/stayEdit.vue';
import stayPage from '@/pages/stayPage.vue';
import userDetails from '@/pages/userDetails.vue';
import login from '@/pages/loginPage.vue';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'Home',
        component: homePage,
    },
    {
        path: '/login',
        name: 'Login',
        component: login,
    },
    {
        path: '/explore',
        name: 'Explore',
        props: (route) => ({
            ...route.params,
        }),
        component: explorePage,
    },
    {
        path: '/details/:stayId',
        name: 'details',
        component: stayDetails,
    },
    {
        path: '/edit/:stayId',
        name: 'edit',
        component: stayEdit,
    },
    {
        path: '/stay/:stayId',
        name: 'stay-page',
        component: stayPage,
    },
    {
        path: '/details/userId',
        name: 'user-details',
        component: userDetails,
    },
];

const router = new VueRouter({
    mode: 'history',
    routes,
});

export default router;
