<script lang="ts">
  import { defineComponent} from 'vue';

  export default defineComponent({
    props: {
        elements: Array
    },
    methods: {
    },
    });
</script>
<template>
    <ul style="padding-left: 10px;">
    <li class="listElement" v-for="element in elements">
      {{ element }}
    </li>
  </ul>
</template>

<style scoped>
.listElement{
    text-align: left;
}
</style>
