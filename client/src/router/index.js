import { createRouter, createWebHistory } from 'vue-router'
import UserRegister from '../components/UserRegister.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/register',
      name: 'register',
      component: UserRegister
    }
  ]
})

export default router
