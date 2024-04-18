import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: import('../views/HomeView.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/admin',
      name: 'admin',
      component: import('../views/AdminView.vue'),
      children:[
        {
          path:'dashboard',
          name:'dashboard',
          component: import('../layouts/admin/dashboard/dashboard_index.vue')
        },
        {
          path:'fruits',
          name:'fruits',
          component: import('../layouts/admin/fruit/fruit_index.vue')
        },
        {
          path:'bill',
          name:'bill',
          component: import('../layouts/admin/bill/bill_index.vue')
        },
        {
          path:'categories',
          name:'categories',
          component: import('../layouts/admin/category/category_index.vue')
        }
      ]
    },
  ]
})

export default router
