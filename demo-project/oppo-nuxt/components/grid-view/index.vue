<script setup lang="ts">
import { IProductDetailss } from '~/types/home';

interface IProps {
  productsDetal: IProductDetailss[]
}

withDefaults(defineProps<IProps>(), {
  productsDetal: () => []
})
</script>

<template>
  <div class="grid-view">
    <template v-for="item, index of productsDetal" :key="itme.id">
      <div class="grid-view">{{ item.title }}</div>
    </template>
  </div>
</template>

<style scoped lang="scss">

</style>