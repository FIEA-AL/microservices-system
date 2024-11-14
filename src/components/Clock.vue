<script lang="ts">
  import {  defineComponent } from 'vue';

  export default defineComponent({
    data() {
      return {
        targetDate: new Date("2024-12-31T23:59:59Z").getTime() as number,
        now : new Date().getTime() as number,
        timeLeft : 0,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        
      }
    },
    methods: {
    },
    created() {
        const timeLeft = this.targetDate - this.now;
        this.days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        this.hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        this.minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        this.seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
        const updateCountdown = () => {
            this.seconds--;
            if (this.seconds == -1){
                this.seconds = 59;
                this.minutes--;
            }
            if (this.minutes == -1){
                this.minutes = 59;
                this.hours--;
            }
            if (this.hours == -1){
                this.hours = 23;
                this.days--;
            }
            if (this.days == -1){
                clearInterval(countdownInterval);
            }
        }
        const countdownInterval = setInterval(updateCountdown, 1000);
    },
  });
</script>
<template>
    <div>
        <p id="countdown">{{ days }}d {{ hours }}h {{ minutes }}m {{ seconds }}s</p>
    </div>
</template>

<style scoped>
    div {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        font-family: Arial, sans-serif;
    }
    #countdown {
        font-size: 2em;
        color: #f71313;
    }
</style>