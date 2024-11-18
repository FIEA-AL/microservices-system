<script lang="ts">
  import { defineComponent} from 'vue';

  export default defineComponent({
    props: {
        elements: Array,
        title: String
    },
    methods: {
    },
    });
</script>
<template>
  <div style="display: flex; flex-direction: column;">
    <h3>{{title}}</h3>
    <ul style="padding-left: 10px;">
      <li class="listElement" v-for="element in elements">
        {{ element }}
      </li>
    </ul>
  </div>
</template>

<style scoped>
.listElement{
    text-align: left;
}
ul {
  list-style: none;
}
</style>
