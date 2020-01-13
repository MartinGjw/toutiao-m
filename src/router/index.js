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
    path: '/search',
    component: () => import('@/views/search')
  },
  {
    path: '/article/:articleId',
    name: 'article',
    component: () => import('@/views/article'),
    // 将路由参数映射到组件的 props 数据中
    // 参考文档：https://router.vuejs.org/zh/guide/essentials/passing-props.html
    props: true
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
