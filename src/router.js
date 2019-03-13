import Vue from 'vue'
import Router from 'vue-router'
import SignUp from './views/SignUp.vue'
import Login from './views/Login.vue'
import Logout from "./views/Logout.vue"
import WorkoutsIndex from './views/WorkoutsIndex.vue'
import WorkoutsNew from './views/WorkoutsNew.vue'
import WorkoutsShow from './views/WorkoutsShow.vue'
import WorkoutsEdit from './views/WorkoutsEdit.vue'
import ExercisesNew from './views/ExercisesNew.vue'


Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    { path: '/', name: 'workouts-index', component: WorkoutsIndex },
    { path: '/signup', name: 'sign-up', component: SignUp },
    { path: '/login', name: 'login', component: Login },
    { path: '/logout', name: "logout", component: Logout },
    { path: '/workouts/new', name: 'workouts-new', component: WorkoutsNew},
    { path: '/workouts/:id', name: 'workouts-show', component: WorkoutsShow},
    { path: '/workouts/:id/edit', name: 'workouts-edit', component: WorkoutsEdit},
    { path: '/exercises/new', name: 'exercises-new', component: ExercisesNew}
  ]
})
