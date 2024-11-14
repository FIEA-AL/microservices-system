<script lang="ts">
  import { defineComponent} from 'vue';

  export default defineComponent({
    props: {
        label: String,
    },
    methods: {
    },
    });
</script>
<template>
    <button type="button" class="copyButton">{{label}}</button>
</template>

<style scoped>
  .copyButton{
    font-size: 17px;
    padding: 0.5em 2em;
    border: transparent;
    box-shadow: 2px 2px 4px rgba(0,0,0,0.4);
    background: dodgerblue;
    color: white;
    border-radius: 6px;
    height: 50px; margin-top: 5px;
    cursor: pointer;
  }

  .copyButton:hover{
    background: rgb(2,0,36);
    background: linear-gradient(90deg, rgba(30,144,255,1) 0%, rgba(0,212,255,1) 100%);
  }
</style>
