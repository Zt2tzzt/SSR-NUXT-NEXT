<script lang="ts" setup>
import { fetchHomeInfoData } from '@/service/home';

const { data } = await fetchHomeInfoData()
console.log('use-fetch data:', data.value?.data)
</script>

<template>
  <div>
    Page: use-fetch
  </div>
</template>

<style scoped></style>
