import {
  createRouter,
  createWebHistory
} from 'vue-router'
import {
  isMobileTerminal
} from '@/utils/flexible'

// 创建 vueRouter 实例
const router = createRouter({
  history: createWebHistory(),
  routes: [
    // {
    //   path: '/',
    //   name: 'main',
    //   component: () => import('@/views/layout/index.vue'),
    //   children: []
    // },
    // {
    //   path: '/login',
    //   name: 'login',
    //   component: () => import('@/views/login-register/login/index.vue')
    // },
    // {
    //   path: '/register',
    //   name: 'register',
    //   component: () => import('@/views/login-register/register/index.vue')
    // },
    // {
    //   path: '/404',
    //   name: '404',
    //   component: () => import('@/views/error/404/index.vue')
    // },
  ]
})

export default router