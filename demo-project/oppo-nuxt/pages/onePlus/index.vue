<script lang="ts" setup>
import { getHomeInfo } from '@/service/home';

const { data } = await getHomeInfo('onePlus');
</script>

<template>
  <div class="one-plus">
    <div class="wrapper content">
      <!-- 轮播图 -->
      <Swiper :listData="data?.data.banners"></Swiper>

      <!-- 分类 -->
      <TabCategory :listData="data?.data.categorys"></TabCategory>

      <!-- 商品区域-->
      <template v-for="item of data?.data.categorys" :key="item.id">
        <SectionCategory :itemData="item" v-if="!!(item.productDetailss) && item.productDetailss.length > 0"></SectionCategory>
      </template>
    </div>
  </div>
</template>

<style scoped></style>
