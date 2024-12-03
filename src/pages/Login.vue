<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import { UserService } from '../service/UserService';
import ButtonComponent from '../components/ButtonComponent.vue';
import InputComponent from '../components/InputComponent.vue';




export default defineComponent({
  components: {
    InputComponent,
    ButtonComponent
  },
  setup() {
    const router = useRouter();

    const email = ref('')
    const password  = ref('')

    const login = async () => {
      if (email.value && password.value) {
          await UserService.login(email.value, password.value, router);
      } else {
        alert('Please enter a name and a link!');
      }
    };

    const goTo = (route : string) => {
        router.push(route);
    }

    return {
        login,
        email,
        password,
        goTo
    }
  }
});
</script>

<template>
    <div class="pad" style="display: flex; flex-direction: column; gap: 20px; align-items: center;">
      <div style="width: 100%; max-width: 400px;">
        <InputComponent class="pad" v-model="email" type="text" label="Usuario"></InputComponent>
        <InputComponent class="pad" v-model="password" type="text" label="Senha"></InputComponent>
      </div>
      <div class="pad" style="display: flex; gap: 40px;">
        <div><ButtonComponent @click = "login()" label="Login"></ButtonComponent></div>
        <div><ButtonComponent @click = "goTo('/register')" label="Register"></ButtonComponent></div>
      </div>
    </div>
</template>

<style scoped>
  .pad{
    padding: 12px;
  }
</style>
