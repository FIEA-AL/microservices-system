import {  createRouter, createWebHistory } from 'vue-router'
import Countdown from '../components/Countdown.vue'
import Home from '../components/Home.vue'
import QrCode from '../components/QrCode.vue'


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
  ,
  {
    path: '/qrcode',
    component: QrCode,
    name: 'QrCode'
  },
  { path: '/qrcodes/:name', component: QrCode },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})