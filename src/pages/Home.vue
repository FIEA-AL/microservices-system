<script lang="ts">
  import { defineComponent} from 'vue';
import { useRouter } from 'vue-router';
import ButtonComponent from '../components/ButtonComponent.vue';

  export default defineComponent({
    components : {
      ButtonComponent
    },
    setup() {
        const router = useRouter();
        return {
            router
        };
    },
    methods: {
      goTo(route : string) {
        this.router.push(route);
        }
    }
    });
</script>
<template>
  <div style="display: flex; gap: 20px; justify-content: center; margin-top: 20%;">
    <ButtonComponent @click="goTo('/countdown')" label="Countdown" ></ButtonComponent>
    <ButtonComponent @click="goTo('/qrcode')" label="QrCode" ></ButtonComponent>
  </div>

  
</template>

<style scoped>
</style>
