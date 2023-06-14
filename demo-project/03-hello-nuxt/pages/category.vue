<script setup lang="ts">
import { useHomeStore } from '~/store/home';
import { storeToRefs } from 'pinia';

const homeStore = useHomeStore()
const { count } = storeToRefs(homeStore);

function onAddClick() {
  count.value++
}

if (process.server) {
  homeStore.fetchHomeData()
}
function onGetHomeInfoClick() {
  homeStore.fetchHomeData()
}
</script>

<template>
  <div class="category">
    <h1>category</h1>
    <h3>pinia</h3>
    <div>count: {{ count }}</div>
    <button @click="onAddClick">+1</button>
    <button @click="onGetHomeInfoClick">get homeInfo</button>
  </div>
</template>

<style scoped lang="less">

</style>