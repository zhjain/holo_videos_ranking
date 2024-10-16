import { RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/player',
    name: 'Player',
    component: () => import('@/views/Player.vue')
  }
]

export default routes
