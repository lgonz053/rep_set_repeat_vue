import Vue from 'vue'
import Router from 'vue-router'
import SignUp from './views/SignUp.vue'
import Login from './views/Login.vue'
import Logout from "./views/Logout.vue"
import WorkoutsIndex from './views/WorkoutsIndex.vue'
import WorkoutsNew from './views/WorkoutsNew.vue'
import WorkoutsShow from './views/WorkoutsShow.vue'
import WorkoutsEdit from './views/WorkoutsEdit.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    { path: '/', name: 'workouts-index', component: WorkoutsIndex },
    { path: '/signup', name: 'sign-up', component: SignUp },
    { path: '/login', name: 'login', component: Login },
    { path: '/logout', name: "logout", component: Logout },
    { path: '/workouts/new', name: 'workout-new', component: WorkoutsNew},
    { path: '/workouts/:id', name: 'workout-show', component: WorkoutsShow},
    { path: '/workouts/:id/edit', name: 'workout-edit', component: WorkoutsEdit}
  ]
})
