<script setup>
import { ref } from 'vue'

const counter = ref(100)
function onAddButtonClick() {
  counter.value++
}
</script>

<template>
  <div class="home" style="border: 1px solid green; margin: 10px">
    <h1>Home</h1>
    <div>{{ counter }}</div>
    <button @click="onAddButtonClick">加1</button>
  </div>
</template>

<style scoped></style>
