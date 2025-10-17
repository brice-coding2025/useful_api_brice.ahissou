import { createRouter, createWebHistory } from 'vue-router'

import Register from '@/components/users/Register.vue'
import Login from '@/components/users/Login.vue'
import { useUserStore } from '@/stores/users'



const routes = [
   {
    path: '/auth/login',
    name: 'Register',
    component: Register,
  },

  {
    path: '/auth/login',
    name: 'Login',
    component: Login,
  },

]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})


router.beforeEach(async (to, from, next) => {
  const authStore = useUserStore()
  const token = localStorage.getItem('token')

})

export default router
