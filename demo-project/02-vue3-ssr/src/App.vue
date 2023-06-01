<script setup>
import { ref } from 'vue';

const counter = ref(100)
const onAddButtonClick = () => {
  counter.value++
  console.log('哈哈')
}

</script>

<template>
  <div class="app" style="border: 1px solid red;">
    <h1>Vue3 app</h1>
    <div>{{ counter }}</div>
    <button @click="onAddButtonClick">+1</button>
  </div>
</template>

<style scoped>

</style>