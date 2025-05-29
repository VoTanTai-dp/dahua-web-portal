import { createRouter, createWebHistory } from 'vue-router'
import AppLayout from '@/layouts/AppLayout.vue'

const routes = [
  {
    path: '/',
    component: AppLayout,
    children: [
      {
        path: '/',
        name: 'home',
        component: () => import('@/views/HomePage.vue')
      },
      {
        path: 'Database',
        name: 'database',
        component: () => import('@/views/DatabasePage.vue')
      },
      {
        path: 'Setting',
        name: 'setting',
        component: () => import('@/views/SettingPage.vue')
      },
    //   {
    //     path: 'Devices',
    //     name: 'devices',
    //     component: () => import('@/views/DevicePage.vue')
    //   }
    ],
  },
  {
    path: '/Devices',
    name: 'devices',
    component: () => import('@/views/DevicePage.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
