在 grid-view 中，第一个 item，占据宽度 40%

在其中，接受图片的 url，categoryUrl

components\grid-view\index.vue

```vue
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
```

---

在首页 index.vue 中，将抽取分类章节组件 section-category。

components\section-category\index.vue

```vue
<script setup lang="ts">
import { ICategory } from '~/types/home'

interface IProps {
  category: ICategory
}

withDefaults(defineProps<IProps>(), {
  category: () => ({})
})
</script>

<template>
  <div class="section-category">
    <SectionTitle title="Find N 系列"></SectionTitle>
    <GridView
      :category-url="category.url"
      :productsDetails="category.productDetailss"
    ></GridView>
  </div>
</template>

<style scoped lang="less"></style>
```

在首页 index.vue 中，遍历该组件。

pages\index.vue

```vue
<!-- 商品区域-->
<template v-for="item of categorys" :key="item.id">
  <SectionCategory :category="item"></SectionCategory>
</template>
```

---

编写 app-footer 组件。

components\app-footer\index.vue

---

编写 onePlus 页面；

直接发送网络请求，获取数据。

判断，没有产品详情的，不展示商品区域。

pages\onePlus\index.vue

```vue
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
        <SectionCategory :category="item" v-if="!!(item.productDetailss) && item.productDetailss.length > 0"></SectionCategory>
      </template>
    </div>
  </div>
</template>

<style scoped></style>
```

---

编写智能硬件区域。

pages\intelligent\index.vue

```vue
<script lang="ts" setup>
import { getHomeInfo } from '@/service/home';

const { data } = await getHomeInfo('intelligent');
</script>

<template>
  <div class="intelligence">
    <div class="wrapper content">
      <!-- 轮播图 -->
      <Swiper :listData="data?.data.banners"></Swiper>

      <!-- 分类 -->
      <TabCategory :listData="data?.data.categorys"></TabCategory>

      <!-- 商品区域-->
      <template v-for="item of data?.data.categorys" :key="item.id">
        <SectionCategory :category="item" v-if="!!(item.productDetailss) && item.productDetailss.length > 0"></SectionCategory>
      </template>
    </div>
  </div>
</template>

<style scoped></style>
```

---

在首页 idnex.vue，点击 tab-category 中的 item，跳转到详情页。

在首页 index.vue，通过编程导航的方式，跳转路由，传递 type 的 query 字符串。

pages\index.vue

```vue
<script setup lang="ts">
//...
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
  <!-- ... -->
  <TabCategory :listData="categorys" @itemClick="handleTabCategoryItemClick"></TabCategory>
</template>
```

封装获取详情的网络请求。

service\detail.ts

```typescript
import type { IDetailData } from './../types/detail.d';
import type { IResultData } from '@/types/global.d';
import ztRequest from './index'

export type IDetailProductType = 'oppo' | 'air' | 'watch' | 'tablet'

export const getDetailInfo = (type: IDetailProductType) => ztRequest.get<IResultData<IDetailData>>('/oppoDetail', { type })
```

创建 oppo-detail 页面

在其中，通过路由，获取 query 字符串传递过来的参数 type

并发送网络请求，获取数据：

pages\oppo-detail\index.vue

```vue
<script setup lang="ts">
import { getDetailInfo } from '@/service/detail';

const route = useRoute()
console.log('route.query:', route.query)

const { data } = await getDetailInfo('oppo');
console.log('data.value?.data:', data.value?.data)
</script>
```

---

在 oppo-detail 页面中，编写标签页组件，使用 EP 的标签页组件。