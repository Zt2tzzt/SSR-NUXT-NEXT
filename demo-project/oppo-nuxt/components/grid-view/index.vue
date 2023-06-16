<script setup lang="ts">
import { IProductDetailss } from '~/types/home';

interface IProps {
  productsDetails: IProductDetailss[]
}

withDefaults(defineProps<IProps>(), {
  productsDetails: () => []
})
</script>

<template>
  <div class="grid-view">
    <template v-for="item, index of productsDetails" :key="index">
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