import { createRouter, createWebHistory } from 'vue-router'

import login from '../views/login.vue'
import hasilKelulusan from '../pages/hasilKelulusan.vue'

const routes = [
  {
    path: '/',
    component: login
  },
  {
    path: '/hasil',
    component: hasilKelulusan
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router