<script setup lang="ts">
import { getDetailInfo } from '@/service/detail';

const route = useRoute()
console.log('route.query:', route.query)

const { data } = await getDetailInfo('oppo');
console.log('data.value?.data:', data.value?.data)


</script>

<template>
  <div class="oppo-detail">
    <h1>oppo-detail</h1>
  </div>
</template>

<style scoped lang="scss">

</style>