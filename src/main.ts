import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createPinia } from 'pinia'
import { router } from './router'
import { RiEditLine, FaRegularTrashAlt ,IoOpenOutline, MdFiledownloadSharp } from "oh-vue-icons/icons";
import { OhVueIcon, addIcons } from "oh-vue-icons";

addIcons(RiEditLine, FaRegularTrashAlt, IoOpenOutline, MdFiledownloadSharp);

const pinia = createPinia()

const app = createApp(App);

app.use(router)
app.use(pinia)
app.component("v-icon", OhVueIcon)
app.mount('#app')