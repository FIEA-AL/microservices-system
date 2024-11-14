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
      goToCountdown() {
        this.router.push('/countdown');
        }
    }
    });
</script>
<template>
  <div class="card">
    <button type="button" @click="goToCountdown()">Countdown</button>
  </div>

  
</template>

<style scoped>
</style>
