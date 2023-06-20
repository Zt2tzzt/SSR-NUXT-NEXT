<script setup lang="ts">
import type { IProductDetailss } from '~/types/home'

interface IProps {
  itemData: IProductDetailss | null
}
withDefaults(defineProps<IProps>(), {
  itemData: null
})
</script>

<template>
  <div class="grid-view-item" v-if="!!itemData">
    <!-- 产品图片 -->
    <div class="item-img">
      <img class="url" :src="itemData.url" alt="">
    </div>

    <!-- 产品标题 -->
    <div class="item-title">{{ itemData.title }}</div>

    <!-- 产品标签 -->
    <div class="item-labels">
      <template v-for="item, index of itemData.activityList" :key="index">
        <span class="label">{{ item.activityInfo }}</span>
      </template>
    </div>

    <!-- 产品价格 -->
    <div class="item-price">
      <span class="prefix">{{ itemData.priceInfo?.prefix }}</span>
      <span class="prefix">{{ itemData.priceInfo?.currencyTag }}</span>
      <span class="price">{{ itemData.priceInfo?.buyPrice }}</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.grid-view-item {
  text-align: center;
  background-color: #fff;
  border-radius: 8px;
  transition: all 0.2s linear;
  &:hover {
    @include hoverEffect();
  }
  .item-img {
    .url {
      width: $imgWidth;
      height: $imgHeight;
      margin-top: 14px;
      margin-bottom: 7px;
    }
  }
  .item-title {
    padding: 0 20px;
    margin-top: 2px;
    font-weight: 500;
    font-size: 15px;
    text-align: center;
    @include textEllipsis();
  }

  .item-labels {
    height: 45px;
    display: flex;
    justify-content: center;
    align-items: center;
    .label {
      display: inline-block;
      padding: 1px 2px;
      color: $priceColor;
      font-size: 13px;
      border: 1px solid $priceColor;
      margin-right: 4px;
      margin-bottom: 4px;
    }
  }

  .item-price {
    padding-bottom: 40px;
    .prefix {
      color: $priceColor;
      font-size: 13px;
    }

    .price {
      color: $priceColor;
      font-size: 20px;
      line-height: 1;
    }
  }
}
</style>
