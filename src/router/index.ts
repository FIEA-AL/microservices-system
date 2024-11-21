import {  createRouter, createWebHistory } from 'vue-router'
import Countdown from '../components/Countdown.vue'
import Home from '../components/Home.vue'
import QrCode from '../components/QrCode.vue'
import { useQRCodeApi } from '../stores/QRCodeApi'
import Login from '../components/Login.vue'
import Register from '../components/Register.vue'


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
  { path: '/qrcode/:index', name: 'QrCodeQuery', component: QrCode },
  { path: '/login', name : 'Login', component: Login},
  { path: '/register', name : 'Register', component: Register}
]


export const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to, from , next) => {

  const protectedRoutes = ['QrCode'];

  if (protectedRoutes.includes(to.name as string)) {

    const token = localStorage.getItem('authToken'); // Retrieve token from localStorage

    if (!token) {
      alert('Access denied. Please log in first.');
      return next({ name: 'Login' }); // Redirect to login if token is missing
    }
  }

  if (to.name == 'QrCodeQuery') {
    const qrCodeApiInstance = useQRCodeApi();
    const index = Number(to.params.index);

    try {
      const qrCodeUrl = await qrCodeApiInstance.getQRCodeByIndex(index);


      if (qrCodeUrl) {
        if (!qrCodeUrl.startsWith('http://')) {
          window.location.replace(`http://${qrCodeUrl}`);
        } else {
          window.location.replace(qrCodeUrl);
        }
      } else {
        alert('QR Code not found!');
        next({ path: '/qrcode' });
      }
    } catch (error) {
      console.error('Error fetching QR code:', error);
      alert('Error fetching QR code.');
      next({ path: '/qrcode' });
    }
  }else {
    next(); 
  }
});