import {  createRouter, createWebHistory } from 'vue-router'
import Countdown from '../components/Countdown.vue'
import Home from '../components/Home.vue'
import QrCode from '../components/QrCode.vue'
import { useQRCodeApi } from '../stores/QRCodeApi'


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
  { path: '/qrcode/:name', name: 'QrCodeQuery', component: QrCode },
]


export const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to, from , next) => {

  if (to.name == 'QrCodeQuery') {
    const qrCodeApiInstance = useQRCodeApi();
    const name = to.params.name as string;

    try {
      const qrCodeUrl = await qrCodeApiInstance.getQRCodeByName(name);


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