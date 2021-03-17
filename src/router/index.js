import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/pages/homePage.vue'
import explorePage from '@/pages/explorePage.vue'
import stayApp from '@/pages/stayApp.vue'
import stayDetails from '@/pages/stayDetails.vue'
import stayEdit from '@/pages/stayEdit.vue'
import stayPage from '@/pages/stayPage.vue'
import userDetails from '@/pages/userDetails.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/explore',
    name: 'explore',
    component: explorePage
  },
  {
    path: '/stay',
    name: 'stay',
    component: stayApp
  },
  {
    path: '/details/:stayId',
    name: 'details',
    component: stayDetails
  },
  {
    path: '/edit/:stayId',
    name: 'edit',
    component: stayEdit
  },
  {
    path: '/stay/?stayId',
    name: 'stay-page',
    component: stayPage
  },
  {
    path: '/details/userId',
    name: 'user-details',
    component: userDetails
  },
]

const router = new VueRouter({
  mode:'history',
  routes
})

export default router
