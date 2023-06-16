<script setup lang="ts">
import { useHomeStore } from '@/store/home'
import { storeToRefs } from 'pinia'
import type { ICategory } from '~/types/home'

const homeStore = useHomeStore()
const { banners, categorys } = storeToRefs(homeStore)

const handleTabCategoryItemClick = (item: ICategory) => {
  console.log('item.title:', item.title)
}
</script>

<template>
  <div class="home">
    <div class="wrapper content">
      、
      <!-- 轮播图 -->
      <Swiper :listData="banners"></Swiper>
      <!-- 分类 -->
      <TabCategory :listData="categorys" @itemClick="handleTabCategoryItemClick"></TabCategory>

      <!-- 商品区域-->
      <SectionTitle title="Find N 系列"></SectionTitle>
      <GridView :productsDetails="categorys[1].productDetailss"></GridView>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
