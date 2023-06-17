<script setup lang="ts">
import { useHomeStore } from '@/store/home'
import { storeToRefs } from 'pinia'
import type { ICategory } from '~/types/home'

const homeStore = useHomeStore()
const { banners, categorys } = storeToRefs(homeStore)

const handleTabCategoryItemClick = (item: ICategory) => {
  
  return navigateTo({
    path: '/oppo-detail',
    query: {
      type: item.type
    }
  })
}
</script>

<template>
  <div class="home">
    <div class="wrapper content">
      <!-- 轮播图 -->
      <Swiper :listData="banners"></Swiper>

      <!-- 分类 -->
      <TabCategory :listData="categorys" @itemClick="handleTabCategoryItemClick"></TabCategory>

      <!-- 商品区域-->
      <template v-for="item of categorys" :key="item.id">
        <SectionCategory :category="item"></SectionCategory>
      </template>
    </div>
  </div>
</template>

<style scoped lang="scss">
</style>
