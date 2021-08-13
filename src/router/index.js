import Vue from 'vue'
import VueRouter from 'vue-router'
import Search from '../views/Search.vue'
import FourOhFour from '../views/FourOhFour.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'search',
    component: Search
  },
  {
    path: '/list',
    name: 'list',
    component: () => import('../views/List.vue')
  },
  {
    path: '/newest',
    name: 'newest',
    component: () => import('../views/Newest.vue')
  },
  {
    path: '/iwillhelp',
    name: 'iwillhelp',
    component: () => import('../views/IWillHelp.vue')
  },
  {
    path: '/faq',
    name: 'faq',
    component: () => import('../views/FAQ.vue')
  },
  {
    path: '/contact',
    name: 'contact',
    component: () => import('../views/Contact.vue')
  },
  {
    path: '/*',
    component: FourOhFour
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
