<script setup lang="ts">
import type { ICategory } from '~/types/home'

interface IProps {
  itemData?: ICategory | null
}
withDefaults(defineProps<IProps>(), {
  itemData: null
})
</script>

<template>
  <div class="section-itemData" v-if="!!itemData">
    <SectionTitle :title="itemData.title"></SectionTitle>
    <GridView
      :pic-url="itemData.url"
      :list-data="itemData.productDetailss"
    ></GridView>
  </div>
</template>

<style scoped lang="scss"></style>
