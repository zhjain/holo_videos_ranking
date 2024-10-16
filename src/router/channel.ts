import { RouteRecordRaw } from 'vue-router'
import MainLayout from '@/layouts/MainLayout.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/channel',
    component: MainLayout,
    children: [
      {
        path: '',
        name: 'Channel',
        component: () => import('@/views/Channel/Index.vue')
      },
      {
        path: ':nick',
        component: () => import('@/views/Channel/Nick/Index.vue'),
        children: [
          {
            path: '',
            name: 'ChannelHome',
            component: () => import('@/views/Channel/Nick/Index.vue')
          },
          {
            path: 'charts',
            name: 'ChannelCharts',
            component: () => import('@/views/Channel/Nick/Charts.vue')
          },
          {
            path: 'videos',
            name: 'ChannelVideos',
            component: () => import('@/views/Channel/Nick/Videos.vue')
          }
        ]
      }
    ]
  }
]

export default routes
