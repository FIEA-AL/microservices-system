<script lang="ts">
import { defineComponent } from 'vue';
import InputComponent from './InputComponent.vue';
import ListComponent from './ListComponent.vue';
import ButtonComponent from './ButtonComponent.vue';


export default defineComponent({
  components: {
    InputComponent,
    ListComponent,
    ButtonComponent
  },
  data() {
    return {
      date: '2025-11-01T10:25',
      color: '#ffffff',
      backgroundColor: '#000000',
      finalCountdownLink: '',
      loading: true,
      stepGuide: ['1 Passo: blaaaaaaaaaa', '1 Passo: blaaaaaaaaaa', '1 Passo: blaaaaaaaaaa', '1 Passo: blaaaaaaaaaa', ]
    };
  },
  computed: {
  },
  methods: {
    async copyURL() {
      try {
        await navigator.clipboard.writeText(`<img src="${this.finalCountdownLink}">`);
        alert('Html Copiado');
      } catch (error) {
        alert('Erro');
      }
    },
    countdownLink() {
      const date = this.date;
      const color = this.color.slice(1);
      const backgroundColor = this.backgroundColor.slice(1);

      const d = new Date(date);
      const month = (d.getMonth() + 1).toString().padStart(2, '0');
      const day = d.getDate().toString().padStart(2, '0');
      const year = d.getFullYear().toString().slice(2);
      const hours = d.getHours().toString().padStart(2, '0');
      const minutes = d.getMinutes().toString().padStart(2, '0');

      const formattedDate = `${day}${month}${year}_${hours}${minutes}`;
      return `http://127.0.0.1:5000/countdown?gif=${formattedDate}_${color}_${backgroundColor}.gif`;
    },
    updateCountdownLink() {
      this.loading = true;
      const link = this.countdownLink();

      // Preload the image
      const img = new Image();
      img.src = link;
      img.onload = () => {
        // Once loaded, set the final link and stop loading spinner
        this.finalCountdownLink = link;
        this.loading = false;
      };
      img.onerror = () => {
        this.loading = false;
        alert('Failed to load image.');
      };
    },
    debounce(fn: Function, delay: number) {
      let timeout: ReturnType<typeof setTimeout>;
      return (...args: any[]) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => fn(...args), delay);
      };
    }
  },
  watch: {
    date: {
      handler: function () {
        this.debounce(this.updateCountdownLink, 500)();
      },
      immediate: true,
    },
    color: {
      handler: function () {
        this.debounce(this.updateCountdownLink, 500)();
      },
      immediate: true,
    },
    backgroundColor: {
      handler: function () {
        this.debounce(this.updateCountdownLink, 500)();
      },
      immediate: true,
    }
  },
  created() {
    this.updateCountdownLink();
  }
});
</script>

<template>
  <div class="mainDiv flex"  >
    <div class="leftSide">
      <h1 class="pad" style="color: rgb(90 77 77);">Gerador de link de contador</h1>

      <section>
        <InputComponent v-model="date" type="datetime-local" label="Data limite" class="pad" style="width: 100%"></InputComponent>
  
        <div class="flex" style="gap: 50px;">
          <div class="flex colorPicker"  style="width: 100%;">
            <InputComponent v-model="color" type="color" label="Cor do texto" width="100%" class="pad"></InputComponent>
            <div style="display: flex; align-items: center;"><span>{{ color }}</span></div>
          </div>
          <div class="flex colorPicker"  style="width: 100%;">
            <InputComponent v-model="backgroundColor" type="color" label="Cor do fundo" width="100%" class="pad"></InputComponent>
            <div style="display: flex; align-items: center;"><span>{{ backgroundColor }}</span></div>
          </div>
        </div>
      </section>

      <hr>

      <h3 class="pad">Exemplo</h3>
      <div class="pad">
        <div v-if="!loading">
          <img 
            :src="finalCountdownLink" 
            class="countdownImage" 
          >
        </div>
        <div v-if="loading" class="spinner">Carregando...</div>
      </div>


      <div style="display: flex; gap: 20px;" class="pad urlAndButtonDiv">
        <div style="width: 100%">
          <InputComponent  type="text" :modelValue=finalCountdownLink></InputComponent>
        </div>
        <ButtonComponent @click="copyURL" label="Copiar HTML" ></ButtonComponent>
      </div>
    </div>
    <div  class=" pad rightSide" >
      <div class="eyeImg">
        <img  class="eyeImgimg"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRf6zoRR_FPG7f2knECoYTgOuETejMYPg71vg&s" 
            >
      </div>
      <h2 class="pad" style="text-align: left; padding-bottom: 0;">Como utilizar</h2>
      <div class="pad">
        <ListComponent class="text" :elements=stepGuide></ListComponent>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .eyeImg{
    width: 100%;
    height: 400px;
  }
  .eyeImgimg{
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .mainDiv{}
  .text{
    overflow-wrap: break-word; 
    
  }
  .leftSide{
    width: 60%;
  }
  .rightSide{
    width: 40%; 
    text-align: center;
    background: #F3F5F8;
    border-radius: 1rem;
    height: 78vh;
  }
  .flex{
    display: flex;
  }
  .spinner {
    font-size: 20px;
    color: #000000;
  }
  .countdownImage{
    width: 100%;
  }
  .pad{
    padding: 12px;
  }
 
  @media (max-width: 1568px) {
    .urlAndButtonDiv{
      flex-direction: column;
    }
  }

  @media (max-width: 1040px) {
    .mainDiv{
      display: grid;
    }
    .leftSide{
      width: 100%;
    }
    .rightSide{
      width: 100%;
    }
    .text{
      overflow-wrap: anywhere;
    }
  }

  @media (max-width: 640px) {
    .colorPicker{
      flex-direction: column;
    }
  }
</style>
