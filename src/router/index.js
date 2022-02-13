import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Lesson from '../views/Lesson.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/ttsTest',
    name: 'ttsTest',
    component: () => import('../views/TTSTest.vue')
  },
  {
    path: '/:lessonTitle/:startPage/:endPage',
    name: 'Lesson',
    component: Lesson
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
