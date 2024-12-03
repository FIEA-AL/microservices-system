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
  <div class="pad12 flex loginMenu" style="gap: 20px; ">
      <div class="inputsWidth">
        <InputComponent class="pad12" v-model="email" type="text" label="Usuario"></InputComponent>
        <InputComponent class="pad12" v-model="password" type="text" label="Senha"></InputComponent>
      </div>
        <div class="pad12"><ButtonComponent @click = register() label="Register"></ButtonComponent></div>
  </div>
</template>

<style scoped>
  .flex{
    display: flex;
  }
  .inputsWidth{
    width: 100%; 
    max-width: 400px;
  }
  .loginMenu{
    flex-direction: column;
    align-items: center;
  }
  .pad12{
    padding: 12px;
  }
</style>
