<script setup lang="ts">
import { IProductDetailss } from '~/types/home'

interface IProps {
  productsDetails?: IProductDetailss[]
  categoryUrl?: string
}

withDefaults(defineProps<IProps>(), {
  productsDetails: () => [],
  categoryUrl: ''
})
</script>

<template>
  
  <div class="grid-view">
    <!-- 第一个 item -->
    <div class="view-item first">
      <img :src="categoryUrl" alt="商品图片">
    </div>

    <!-- 其余的 item -->
    <template v-for="(item, index) of productsDetails" :key="index">
      <div class="view-item">
        <grid-view-item :productDetail="item"></grid-view-item>
      </div>
    </template>
  </div>
</template>

<style scoped lang="scss">
.grid-view {
  width: $contentWidth + 18px;
  /* @include border(green); */
  @include normalFlex();
  flex-wrap: wrap;
  justify-content: flex-start;

  .view-item {
    width: 20%;
    padding-right: 18px;
    margin-bottom: 18px;
    /* @include border(red); */
    /* height: $gridItemHeight; */
    box-sizing: border-box;
    background-color: $bgGrayColor;
    cursor: pointer;
  }

  .first {
    width: 40%;
    & > img {
      width: 100%;
      height: 100%;
      transition: all 0.2s linear;
      &:hover {
        @include hoverEffect();
      }
    }
  }
}
</style>
