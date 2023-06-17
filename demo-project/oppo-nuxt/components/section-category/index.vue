<script setup lang="ts">
import type { ICategory } from '~/types/home'

interface IProps {
  category?: ICategory
}

withDefaults(defineProps<IProps>(), {
  category: null
})
</script>

<template>
  <div class="section-category" v-if="!!category">
    <SectionTitle :title="category.title"></SectionTitle>
    <GridView
      :category-url="category.url"
      :productsDetails="category.productDetailss"
    ></GridView>
  </div>
</template>

<style scoped lang="scss"></style>
