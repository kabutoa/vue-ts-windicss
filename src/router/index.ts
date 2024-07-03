import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'HomeRoute',
    component: () => import('@/views/home/index.vue')
  },
  {
    path: '/about',
    name: 'AboutRoute',
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('@/views/about/index.vue'),
    redirect: '/about/user', //新增
    children: [
      {
        path: '/about/user',
        name: 'AboutUserRoute',
        component: () => import('@/views/about/user/index.vue')
      },
      {
        path: '/about/manage',
        name: 'AboutManageRoute',
        component: () => import('@/views/about/manage/index.vue')
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFoundRoute',
    component: () => import('@/views/not-found/index.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
