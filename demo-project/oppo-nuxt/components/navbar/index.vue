<script setup lang="ts">
import type { INavbar } from '~/types/home'

interface IProps {
  listData: INavbar[]
}
withDefaults(defineProps<IProps>(), {
  listData: () => []
})

const currentIndex = ref<number>(0)

const onNavBarItemClick = (index: number) => {
  currentIndex.value = index
}

const getPagePath = (item: INavbar) => {
 return item.type === 'oppo' ? '/' : '/' + item.type
}
</script>

<template>
  <div class="navbar">
    <div class="wrapper content">
      <!-- logo -->
      <div class="content-left">
        <NuxtLink to="/">
          <img class="logo" src="@/assets/images/logo.png" alt="logo" />
          <!-- SEO 优化 -->
          <h1 class="title">OPPO商城</h1>
        </NuxtLink>
      </div>

      <!-- 菜单列表 -->
      <ul class="content-center">
        <template v-for="(item, index) of listData" :key="index">
          <li :class="{ active: currentIndex === index }">
            <NuxtLink class="link" :to="getPagePath(item)" @click="onNavBarItemClick(index)">
              {{ item.title }}
            </NuxtLink>
          </li>
        </template>
      </ul>

      <!-- 搜索框 -->
      <div class="content-right">
        <search></search>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.navbar {
  height: $navBarHeight;
  z-index: 99;
  border-bottom-color: rgba(0, 0, 0, 0.06);
  border-bottom-style: solid;
  border-bottom-width: 1px;

  /* 吸顶 */
  @include elementSticky(36px);
  background-color: white;

  .content {
    height: 100%;
    /* @include border(); */
    @include normalFlex();
    justify-content: flex-start;
    align-items: center;

    .content-left {
      display: inline-block;
      width: $logoWidth;
      height: $logoHeight;
      .logo {
        height: 100%;
      }
      .title {
        text-indent: -1000px;
        height: 0;
        margin: 0;
      }
    }

    .content-center {
      @include normalFlex();
      width: 530px;
      margin-left: 60px;

      .link {
        font-size: 14px;
        color: #000;
        opacity: 0.55;
      }
      .link:hover {
        opacity: 1;
      }
      .active .link {
        opacity: 1;
      }
    }

    .content-right {
      margin-left: 50px;
    }
  }
}
</style>
