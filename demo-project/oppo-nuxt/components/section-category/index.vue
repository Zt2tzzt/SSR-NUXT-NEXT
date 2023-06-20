<script setup lang="ts">
import type { ICategory } from '~/types/home'

interface IProps {
  itemData?: ICategory
}

withDefaults(defineProps<IProps>(), {
  itemData: null
})
</script>

<template>
  <div class="section-itemData" v-if="!!itemData">
    <SectionTitle :title="itemData.title"></SectionTitle>
    <GridView
      :itemData-url="itemData.url"
      :productsDetails="itemData.productDetailss"
    ></GridView>
  </div>
</template>

<style scoped lang="scss"></style>
