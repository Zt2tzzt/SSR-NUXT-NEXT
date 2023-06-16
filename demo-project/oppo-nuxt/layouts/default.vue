<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useHomeStore } from '~/store/home';

const homeStore = useHomeStore()
homeStore.fetchHomeInfoData('oppo')
const { navbars } = storeToRefs(homeStore)
</script>

<template>
  <div class="default-layout">
    <!-- header -->
    <app-header></app-header>
    <!-- navbar -->
    <navbar :listData="navbars"></navbar>
    <slot></slot>
    <!-- footer -->
    <app-footer></app-footer>
  </div>
</template>

<style scoped lang="scss">
</style>
