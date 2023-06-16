<script setup lang="ts">
import type { ICategory } from '~/types/home';

interface IProps {
  listData: ICategory[]
}
withDefaults(defineProps<IProps>(), {
  listData: () => []
})

const emits = defineEmits<{
  (e: 'itemClick', item: ICategory): void
}>()

const onItemClick = (item: ICategory) => {
  emits('itemClick', item)
}
</script>

<template>
  <div class="tab-category">
    <template v-for="item, index of listData" :key="index">
      <div class="category-item" @click="onItemClick(item)">
        <img :src="item.picStr" alt="" class="pic-str">
        <div class="title">{{ item.title }}</div>
      </div>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.tab-category {
  margin-top: 40px; /* color: red; */
  /* @include border(); */
  @include normalFlex();
  align-items: center;
  .category-item {
    height: 100%;
    cursor: pointer;
    .pic-str {
      width: 80px;
      height: 80px;
    }

    .title {
      margin-top: 16px;
      font-size: 16px;
      text-align: center;
      height: 24px;
      max-width: "120px";
    }
  }
}
</style>
