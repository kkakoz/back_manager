import {
  createRouter,
  createWebHistory
} from 'vue-router'

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
          path: '/videos',
          name: 'video',
          component: () => import('@/views/videos/videos/index.vue'),
        },
        {
          path: '/videos/add',
          name: 'videoAdd',
          component: () => import('@/views/videos/video_add/index.vue'),
        },
        {
          path: '/collections',
          name: 'collection',
          component: () => import('@/views/videos/collection/index.vue'),
        },
        {
          path: '/collections/add',
          name: 'collectionAdd',
          component: () => import('@/views/videos/collection_add/index.vue'),
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