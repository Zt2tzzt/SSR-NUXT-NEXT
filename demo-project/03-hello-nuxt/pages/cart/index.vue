<script setup lang="ts">
import { useHomeStore } from '~/store/home';
import { storeToRefs } from 'pinia';

const homeStore = useHomeStore()
const { count } = storeToRefs(homeStore);
</script>

<template>
  <div class="cart">
    <h1>cart</h1>
    <h3>pinia</h3>
    <div>count: {{ count }}</div>
  </div>
</template>

<style scoped lang="less">
</style>