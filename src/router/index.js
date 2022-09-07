import {
  createRouter,
  createWebHistory
} from 'vue-router'

import VideoAdd from '@/views/video/video_add/index.vue'

// 创建 vueRouter 实例
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'main',
      component: () => import('@/views/layout/index.vue'),
      children: [
        {
          path: '/resource',
          name: 'resource',
          component: () => import('@/views/video/resource/index.vue'),
        },
        {
          path: '/resource/add',
          name: 'resourceAdd',
          component: () => import('@/views/video/resource_add/index.vue'),
        },
        {
          path: '/video',
          name: 'video',
          component: () => import('@/views/video/video/index.vue'),
        },
        {
          path: '/video/add',
          name: 'videoAdd',
          component: VideoAdd,
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/index.vue')
    },
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