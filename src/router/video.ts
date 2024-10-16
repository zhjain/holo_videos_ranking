import { RouteRecordRaw } from 'vue-router'
import MainLayout from '@/layouts/MainLayout.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/video',
    component: MainLayout,
    children: [
      {
        path: '',
        name: 'Video',
        component: () => import('@/views/Video/Index.vue')
      },
      {
        path: ':id',
        name: 'VideoDetail',
        component: () => import('@/views/Video/Id.vue')
      }
    ]
  }
]

export default routes
