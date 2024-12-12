import {  createRouter, createWebHistory } from 'vue-router'
import Countdown from '../pages/Countdown.vue'
import Home from "../pages/Home.vue";
import Login from "../pages/Login.vue";
import Register from "../pages/Register.vue";
import { QrCodeService } from "../service/QrCodeService";
import Empty from "../pages/Empty.vue";
import Frame from "../pages/QrCode/Frame.vue";
import editQrCode from "../pages/QrCode/editQrCode.vue";

const routes = [
  {
    path: "/",
    component: Home,
    name: "Home",
  },
  {
    path: "/countdown",
    component: Countdown,
    name: "Countdown",
  },
  {
    path: "/qrcode",
    component: Frame,
    name: "QrCode",
  },
  {
    path: "/qrcode/:id",
    component: Empty,
    name: "QrCodeQuery",
  },
  {
    path: "/qrcode/create",
    component: editQrCode,
    name: "QrCodeCreate",
  },
  {
    path: "/qrcode/edit/:index",
    component: editQrCode,
    name: "QrCodeEdit",
  },
  {
    path: "/empty",
    component: Empty,
    name: "Empty",
  },

  {
    path: "/login",
    component: Login,
    name: "Login",
  },
  {
    path: "/register",
    component: Register,
    name: "Register",
  },
];

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
    const id = to.params.id;

    try {
      
      const qrCode = await QrCodeService.getQRCodeById(id as string);
      if (qrCode) {
        const qrCodeUrl = qrCode.url
        if (!qrCodeUrl.startsWith("https://")) {
          window.location.replace(`https://${qrCodeUrl}`);
        } else {
          window.location.replace(qrCodeUrl);
        }
      } else {
        alert('QR Code not found!');
        next({ path: '/empty' });
      }
    } catch (error) {
      console.error('Error fetching QR code:', error);
      alert('Error fetching QR code.');
      next({ path: '/empty' });
    }
  }else {
    next(); 
  }
});