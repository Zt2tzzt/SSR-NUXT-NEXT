<script setup lang="ts">
import { fetchHomeInfo } from '@/service/home';

const { data } = await fetchHomeInfo('oppo');
console.log('data.value.data:', data.value?.data)
</script>

<template>
  <div class="default-layout">
    <!-- header -->
    <app-header></app-header>
    <!-- navbar -->
    <navbar></navbar>
    <slot></slot>
    <!-- footer -->
    <app-footer></app-footer>
  </div>
</template>

<style scoped lang="scss">
</style>
