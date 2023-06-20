<script setup lang="ts">
import { IBanner } from '~/types/home';

interface IProps {
  listData: IBanner[]
}
withDefaults(defineProps<IProps>(), {
  listData: () => []
})

const currentindex = ref<number>(0)
const onCarouselChange = (index: number) => {
  currentindex.value = index
}
</script>

<template>
  <div class="swiper">
    <div class="wrapper content">
      <el-carousel height="480px" indicator-position="none" @change="onCarouselChange">
        <el-carousel-item v-for="(item, index) of listData" :key="index">
          <img class="pic-str" :src="item.picStr" alt="轮播图">
        </el-carousel-item>
      </el-carousel>
    </div>

    <!-- 指示器 -->
    <ul class="dots">
      <template v-for="item, index of listData" :key="index">
        <li :class="['dot', { active: currentindex === index }]"></li>
      </template>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.swiper {
  padding-top: 36px;
  position: relative;
  .pic-str {
    width: 100%;
    height: 100%;
    border-radius: 10px;
  }

  .dots {
    height: 40px;
    width: 100%;
    position: absolute;
    bottom: 0px;
    left: 0;
    text-align: center;

    .dot {
      display: inline-block;
      width: 10px;
      height: 10px;
      box-sizing: border-box;
      border-radius: 10px;
      margin-right: 10px;
      background-color: #fff;
      opacity: 0.8;
    }
    .active {
      background-color: transparent;
      border: 2px solid #fff;
      width: 12px;
      height: 12px;
      position: relative;
      top: 1px;
    }
  }
}
</style>