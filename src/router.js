import Vue from 'vue'
import Router from 'vue-router'
import WorkoutsIndex from './views/WorkoutsIndex.vue'
import SignUp from './views/SignUp.vue'
import Login from './views/Login.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    { path: '/', name: 'workouts-index', component: WorkoutsIndex },
    { path: '/signup', name: 'sign-up', component: SignUp },
    { path: '/login', name: 'login', component: Login}
  ]
})
