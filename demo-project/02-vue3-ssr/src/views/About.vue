<script setup>
import { storeToRefs } from 'pinia';
import { useHomeStore  } from '../store/home';

const homeStore = useHomeStore()

const { count } = storeToRefs(homeStore)

function onAddButtonClick() {
  count.value++
}
</script>

<template>
  <div class="about" style="border: 1px solid blue; margin: 10px">
    <h1>About</h1>
    <div>{{ count }}</div>
    <button @click="onAddButtonClick">加1</button>
  </div>
</template>

<style scoped></style>
