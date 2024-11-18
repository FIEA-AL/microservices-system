<script lang="ts">
  import { defineComponent} from 'vue';

  export default defineComponent({
    props: {
        type: String,
        label: String,
        modelValue: String,
        width: String
    },
    emits: ['update:modelValue'],
    methods: {
        handleInput(event: Event) {
        const target = event.target as HTMLInputElement;
        this.$emit('update:modelValue', target.value);
        },
    },
    });
</script>
<template>
    <div class="divInput" >
        <label style="padding-bottom: 5px;">{{ label }}</label>
        <input class="inputStyle" :type="type" :value="modelValue" @input="handleInput" v-bind:style="[width ? {width: width} : {}]">
    </div>
</template>

<style scoped>
    .divInput{
        display: flex; flex-direction: column;
    }
    .inputStyle{
        background-color: #F3F5F8;
        border: 1px solid rgb(117, 112, 112);
        padding: 1rem;
        border-radius: 0.5rem;
    }
    .inputStyle:focus{
        outline-color: rgb(84, 39, 207);
    }
</style>
