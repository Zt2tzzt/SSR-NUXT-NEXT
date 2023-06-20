# oppe-nuxt 项目

## 一、导航栏组件

在 `/components` 目录下，创建 `navbar/index.vue` 组件。

oppo-nuxt\components\navbar\index.vue

```vue
<template>
  <div class="navbar">
    <div class="wrapper content">
      navbar
    </div>
  </div>
</template>
```

在默认布局 `default.vue` 中，使用。

oppo-nuxt\layouts\default.vue

```vue
<template>
  <div class="default-layout">
    <!-- header -->
    <app-header></app-header>
    <!-- navbar -->
    <navbar></navbar>
    
    <slot></slot>
    
    <!-- footer -->
    <app-footer></app-footer>
  </div>
</template>
```

在 `navbar/index.vue` 中，分为三部分：

- logo；
- 菜单列表；
- 搜索区域；

分别编写其中的内容。

oppo-nuxt\components\navbar\index.vue

```vue
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
        <li>
          <NuxtLink class="link" to="/">
            OPPO专区
          </NuxtLink>
        </li>
        <li>
          <NuxtLink class="link" to="/">
            OnePlus专区
          </NuxtLink>
        </li>
        <li>
          <NuxtLink class="link" to="/">
            智能硬件
          </NuxtLink>
        </li>
        <li>
          <NuxtLink class="link" to="/">
            服务
          </NuxtLink>
        </li>
      </ul>
      
      <!-- 搜索框 -->
      <div class="content-right">
        <search></search>
      </div>
    </div>
  </div>
</template>
```

在 `/components` 目录中，创建一个 `search` 组件，用于展示搜索框。

oppo-nuxt\components\search\index.vue

```vue
<template>
  <div class="search">
    <input type="text" placeholder="Reno9 系列">
    <img class="search-svg" src="@/assets/images/search.svg" alt="search">
  </div>
</template>
```

## 二、网络请求封装

将之前封装好的 `service/index`，拷贝到项目中。修改 `BASE_URL`

oppo-nuxt\service\index.ts

测试：在默认布局 `default.vue` 中，发送网络请求。

oppo-nuxt\layouts\default.vue

```vue
<script setup lang="ts">
import { fetchHomeInfo } from '@/service/home';

const { data } = await fetchHomeInfo('oppo');
console.log('data.value.data:', data.value?.data)
</script>
```

## 三、pinia 集成

安装依赖：

```shell
pnpm add pinia

pnpm add @pinia/nuxt
```

在 `nuxt.config.ts` 中，进行配置：

03-hello-nuxt\nuxt.config.ts

```typescript
export default defineNuxtConfig({
  modules: ['@pinia/nuxt']
})
```

### 1.homeStore

在 `/store` 目录下，创建 `home.ts` 文件。

在 actions 中，使用封装好的网络请求。

为 state 指定类型。

给网络请求的返回值，指定类型。

oppo-nuxt\service\home.ts

```typescript
import ztRequest from './index'
import type { IResultData } from '@/types/global'
import type { HomeInfoType, IHomeData } from '@/types/home';

export const getHomeInfo = (type: HomeInfoType = 'oppo') => {
  return ztRequest.get<IResultData<IHomeData>>('/home/info', {
    type
  })
}
```

oppo-nuxt\store\home.ts

```typescript
import type { HomeInfoType } from '@/types/home';
import type { INavbar, IBanner, ICategory } from '@/types/home';
import { defineStore } from 'pinia';
import { getHomeInfo } from '@/service/home';

interface IHomeState {
  navbars: INavbar[]
  banners: IBanner[]
  categorys: ICategory[]
}

export const useHomeStore =defineStore('home', {
  state: () : IHomeState => ({
    navbars: [],
    banners: [],
    categorys: []
  }),
  actions: {
    async fetchHomeInfoData(type: HomeInfoType) {
      // 服务端发送网络请求，获取数据，会同步给客户端。客户端不发送网络请求。
      const { data } = await getHomeInfo(type)
      this.navbars = data.value.data.navbars || []
      this.banners = data.value.data.banners || []
      this.categorys = data.value.data.categorys || []
    }
  }
})
```

## 四、派发请求

在默认布局 `default.vue` 中，派发 `homeStore` 的 `action`，获取 `navbar` 数据。

将数据传给 `<navbar>`

oppo-nuxt\layouts\default.vue

```vue
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useHomeStore } from '~/store/home';

const homeStore = useHomeStore()
homeStore.fetchHomeInfoData('oppo')
const { navbars } = storeToRefs(homeStore)
</script>

<template>
  <div class="default-layout">
    <!-- header -->
    <app-header></app-header>
    <!-- navbar -->
    <navbar :listData="navbars"></navbar>
    <slot></slot>
    <!-- footer -->
    <app-footer></app-footer>
  </div>
</template>
```

## 五、完善 navbar

在 `navbar/index.vue` 中，接收数据。

oppo-nuxt\components\navbar\index.vue

```vue
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
```

## 六、创建页面

创建 server、onePlus、intelligence 三个页面。

## 七、集成 Element Plus

在项目中，集成 Element Plus

1.安装依赖：

```shell
pnpm add element-plus

pnpm add -D @element-plus/nuxt
```

2；在 `nuxt.config.ts` 中，配置自动导包；

03-hello-nuxt\nuxt.config.ts

```typescript
export default defineNuxtConfig({
  modules: ['@element-plus/nuxt'],
})
```

## 八、首页

### 1.轮播图

在首页，编写轮播图。

在 `/components` 目录下，创建 `swiper/index.vue`

在其中，使用 Element 的走马灯组件。

components\swiper\index.vue

```vue
<script setup lang="ts">
import { ElCarousel, ElCarouselItem } from 'element-plus'
</script>

<template>
  <div class="home">
    <div class="wrapper content">
      <el-carousel height="480px">
        <el-carousel-item v-for="item in 4" :key="item">
          <h3 text="2xl">{{ item }}</h3>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>
```

在首页 `index.vue` 中，获取 `homeStore` 中的 `banners`。

将 `banners`，传递给`swiper/index.vue`

自定义轮播图的“指示器”

oppo-nuxt\components\swiper\index.vue

```vue
<script setup lang="ts">
import { ElCarousel, ElCarouselItem } from 'element-plus'
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
        <el-carousel-item v-for="(item, index) of listData" :key="item.id">
          <img class="pic-str" :src="item.picStr" alt="轮播图">
        </el-carousel-item>
      </el-carousel>
    </div>

    <!-- 指示器 -->
    <ul class="dots">
      <template v-for="item, index of listData" :key="item.id">
        <li :class="['dot', { active: currentindex === index }]"></li>
      </template>
    </ul>
  </div>
</template>
```

### 2.分类栏

在 `/components` 目录下，创建 `tab-category/index.vue`；

在首页 `index.vue` 中，将 `categoriys` 数据，传递给 `tab-category/index.vue` 中。

使用编程式导航，编写 item 点击功能。

oppo-nuxt\components\tab-category\index.vue

```vue
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
    <template v-for="item, index of listData" :key="item.id">
      <div class="category-item" @click="onItemClick(item)">
        <img :src="item.picStr" alt="" class="pic-str">
        <div class="title">{{ item.title }}</div>
      </div>
    </template>
  </div>
</template>
```

在首页 `index.vue` 中，处理事件

pages\index.vue

```vue
<script setup lang="ts">
const handleTabCategoryItemClick = (item: ICategory) => {
  console.log('item.title:', item.title)
}
</script>

<template>
  <div class="home">
    <!-- 分类 -->
    <TabCategory :listData="categorys" @itemClick="handleTabCategoryItemClick"></TabCategory>
    </div>
  </div>
</template>
```

### 3.商品区域

封装 `section-title` 组件。

oppo-nuxt\components\section-title\index.vue

```vue
<script setup lang="ts">
interface IProps {
  title: string
}
withDefaults(defineProps<IProps>(), {
  title: ''
})
</script>

<template>
  <h1 class="section-title">
    {{ title }}
  </h1>
</template>
```

创建 `grid-view` 组件，用于展示商品图片区域。

在其中接收 `productsDetails` 的数据：

oppo-nuxt\components\grid-view\index.vue

```vue
<script setup lang="ts">
import { IProductDetailss } from '~/types/home';

interface IProps {
  productsDetal: IProductDetailss[]
}
withDefaults(defineProps<IProps>(), {
  productsDetal: () => []
})
</script>

<template>
  <div class="grid-view">
    <template v-for="item, index of productsDetal" :key="index">
      <div class="view-item">
        <grid-view-item :productDetail="item"></grid-view-item>  
      </div>
    </template>
  </div>
</template>
```

创建 `grid-view-item` 组件，用于展示商品图片。

在其中接受 `productDetail` 的数据。

components\grid-view-item\index.vue

```vue
<script setup lang="ts">
import type { IProductDetailss } from '~/types/home'

interface IProps {
  productDetail: IProductDetailss | null
}
withDefaults(defineProps<IProps>(), {
  productDetail: null
})
</script>

<template>
  <div class="grid-view-item" v-if="!!productDetail">
    <!-- 产品图片 -->
    <div class="item-img">
      <img class="url" :src="productDetail.url" alt="">
    </div>

    <!-- 产品标题 -->
    <div class="item-title">{{ productDetail.title }}</div>

    <!-- 产品标签 -->
    <div class="item-labels">
      <template v-for="item, index of productDetail.activityList" :key="index">
        <span class="label">{{ item.activityInfo }}</span>
      </template>
    </div>

    <!-- 产品价格 -->
    <div class="item-price">
      <span class="prefix">{{ productDetail.priceInfo?.prefix }}</span>
      <span class="prefix">{{ productDetail.priceInfo?.currencyTag }}</span>
      <span class="price">{{ productDetail.priceInfo?.buyPrice }}</span>
    </div>
  </div>
</template>
```
