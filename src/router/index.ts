import { createRouter, createWebHistory, type NavigationGuardWithThis, type RouteRecordRaw } from 'vue-router'
import authMiddleware from './authMiddleware';
import VueRouteMiddleware, { GLOBAL_MIDDLEWARE_NAME } from './middleware';
import { PageName, Role } from '@/common/constants';
const routes: Array<RouteRecordRaw> = [
    {
      path: '/',
      name: 'home',
      component: import('../views/HomeView.vue'),
      meta:{
        public:true
      },
      children:[
        {
          path: '/',
          name: 'mainbody',
          component: import('../layouts/home/mainbody.vue'),
          meta:{
            public:true
          }
        },
        {
          path: '/about',
          name: 'about',
          component: () => import('../views/AboutView.vue')
        },
        {
          path: '/fruit_detail/:id',
          name: PageName.FRUITDETAIL_PAGE,
          component: () => import('../layouts/home/fruit/fruit_detail.vue')
        },
        {
          path: '/login',
          name: PageName.LOGIN_PAGE,
          component: () => import('../layouts/auth/login_page.vue')
        },
        {
          path: '/register',
          name: PageName.REGISTER_PAGE,
          component: () => import('../layouts/auth/register_page.vue')
        },
      ]
    },    
   
    {
      path: '/admin',
      name: PageName.ADMIN_PAGE,
      component: import('../views/AdminView.vue'),
      meta:{
        public:true
      },
      children:[
        {
          path:'dashboard',
          name:PageName.DASHBOARD_PAGE,
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
        },
        {
          path:'store',
          name:'store',
          component: import('../layouts/admin/store/store_index.vue')
        }
      ]
    },
  ]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach(
  VueRouteMiddleware({
    [GLOBAL_MIDDLEWARE_NAME]: authMiddleware,
  }) as NavigationGuardWithThis<unknown>,
);

export default router
