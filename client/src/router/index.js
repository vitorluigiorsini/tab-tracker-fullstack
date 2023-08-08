import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../components/HomePage.vue'
import UserRegister from '../components/UserRegister.vue'
import UserLogin from '../components/UserLogin.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'homepage',
      component: HomePage
    },
    {
      path: '/register',
      name: 'register',
      component: UserRegister
    },
    {
      path: '/login',
      name: 'login',
      component: UserLogin
    }
  ]
})

export default router
