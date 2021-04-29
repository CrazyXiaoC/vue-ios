import Vue from 'vue'
import VueRouter from 'vue-router'

import Layout from '../layout/index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/layout',
    component: Layout,
    hidden: true,
    children: [
      // {
      //   path: '/home',
      //   name: 'home',
      //   component: () => import('@/views/home/index.vue')
      // },
      // {
      //   path: '/threeJsTest6',
      //   name: 'threeJsTest6',
      //   component: () => import('@/views/threeJs/locIcon2d.vue')
      // },
      // {
      //   path: '/threeJsTest7',
      //   name: 'threeJsTest7',
      //   component: () => import('@/views/threeJs/locIcon3d.vue')
      // },
      // {
      //   path: '/testScene',
      //   name: 'testScene',
      //   component: () => import('@/views/threeJs/testScene.vue')
      // },
      // {
      //   path: '/mapTest',
      //   name: 'mapTest',
      //   component: () => import('@/views/threeJs/mapTest.vue')
      // },
    ]
  },
  {
    path: '*',
    redirect: '/switchInterface/bootUp',
    hidden: true
  },
  {
    path: '/switchInterface/bootUp',
    component: () => import('@/views/switchInterface/bootUp.vue'),
    hidden: true
  },
  // {
  //   path: '/home',
  //   component: () => import('@/views/home/index'),
  //   hidden: true
  // },
  // {
  //   path: '/404',
  //   component: () => import('@/views/errorPage/404'),
  //   hidden: true
  // },
  // {
  //   path: '/401',
  //   component: () => import('@/views/errorPage/401'),
  //   hidden: true
  // },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router