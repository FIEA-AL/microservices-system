<script lang="ts">
  import { defineComponent} from 'vue';
import { useRouter } from 'vue-router';

  export default defineComponent({
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
  <div class="card">
    <button type="button" @click="goTo('/countdown')">Countdown</button>
    <button type="button" @click="goTo('/qrcode')">QrCode</button>
  </div>

  
</template>

<style scoped>
</style>
