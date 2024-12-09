<script lang="ts">
  import { defineComponent} from 'vue';

  export default defineComponent({
    props: {
        elements: Array,
        title: String,
        icon: String,
    },
    methods: {
    },
    });
</script>
<template>
  <div style="display: flex; flex-direction: column;">
    <h3>{{title}}</h3>
    <ul>
      <li class="listElement" v-for="element in elements">
        <strong style="color: #5C5C5C;">{{ element }}</strong>
        
      </li>
    </ul>
  </div>
</template>

<style scoped>
.listElement{
    text-align: left;
    padding-top: 20px;
    padding-bottom: 20px;
    margin-bottom: 8px;
    padding-left: 20px;
    background-color: #F3F5F8;
    border-bottom: 1px solid #E4E4E4;
}
ul {
  list-style: none;
}
</style>
