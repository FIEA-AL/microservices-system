import {  createRouter, createWebHistory } from 'vue-router'
import Countdown from '../components/Countdown.vue'
import Home from '../components/Home.vue'


const routes = [
  {
    path: '/',
    component: Home,
    name: 'Home'
  },
  {
    path: '/countdown',
    component: Countdown,
    name: 'Countdown'
  }
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})