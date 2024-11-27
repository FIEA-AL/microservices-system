<script lang="ts">
import { defineComponent, ref } from 'vue';
import InputComponent from './InputComponent.vue';
import ButtonComponent from './ButtonComponent.vue';
import { useRouter } from 'vue-router';
import { UserService } from '../service/UserService';




export default defineComponent({
  components: {
    InputComponent,
    ButtonComponent
  },
  setup() {
    const router = useRouter()

    const email = ref('')
    const password  = ref('')

    const register = async () => {
      if (email.value && password.value) {
          await UserService.saveUser(email.value, password.value, router);
      } else {
        alert('Please enter a name and a link!');
      }
    };

    return {
        register,
        email,
        password
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
        <div class="pad"><ButtonComponent @click = register() label="Register"></ButtonComponent></div>
  </div>
</template>

<style scoped>
 .pad{
  padding: 12px;
 }
</style>
