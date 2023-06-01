import { createRouter } from 'vue-router';

const routes = [
  {
    path: '/',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/about',
    component: () => import('../views/About.vue')
  }
]

export default function (history) {
  
  return createRouter({
    history,
    routes
  })
}