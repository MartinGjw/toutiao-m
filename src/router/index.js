import Vue from 'vue'
import VueRouter from 'vue-router'
// import '@/views/login'

Vue.use(VueRouter)

const routes = [
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
  {
    path: '/login',
    component: () => import('@/views/login')
  },
  {
    path: '/',
    component: () => import('../views/tabbar'),
    children: [
      {
        path: '',
        component: () => import('../views/home')
      },
      {
        path: 'qa',
        component: () => import('../views/qa')
      },
      {
        path: 'video',
        component: () => import('../views/video')
      },
      {
        path: 'my',
        component: () => import('../views/my')
      }
    ]

  }
]

const router = new VueRouter({
  routes
})

export default router
