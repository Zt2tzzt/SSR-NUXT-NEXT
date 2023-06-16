导航栏组件。

在 components 目录下，创建 `navbar/index.vue` 组件。

demo-project\oppo-nuxt\components\navbar\index.vue

```vue
<template>
  <div class="navbar">
    <div class="wrapper content">
      navbar
    </div>
  </div>
</template>
```

在布局中，使用。

demo-project\oppo-nuxt\layouts\default.vue

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

在 navbar/index.vue 中，编写

分为三部分，logo、菜单列表，搜索区域。分别编写其中的内容。

demo-project\oppo-nuxt\components\navbar\index.vue

```vue
<template>
  <div class="navbar">
    <div class="wrapper content">
      <div class="content-left">
        <NuxtLink to="/">
          <img class="logo" src="@/assets/images/logo.png" alt="logo" />
          <!-- SEO 优化 -->
          <h1 class="title">OPPO商城</h1>
        </NuxtLink>
      </div>
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
      <div class="content-right">
        <search></search>
      </div>
    </div>
  </div>
</template>
```

在 components 目录中，创建一个 search 组件。

demo-project\oppo-nuxt\components\search\index.vue

```vue
<template>
  <div class="search">
    <input type="text" placeholder="Reno9 系列">
    <img class="search-svg" src="@/assets/images/search.svg" alt="search">
  </div>
</template>
```

---

封装服务端网络请求。

将之前封装好的 service，拷贝到项目中。修改 `BASE_URL`

demo-project\oppo-nuxt\service\index.ts

在 `default.vue` 布局中，发送网络请求。

demo-project\oppo-nuxt\layouts\default.vue

```vue
<script setup lang="ts">
import { fetchHomeInfo } from '@/service/home';

const { data } = await fetchHomeInfo('oppo');
console.log('data.value.data:', data.value?.data)
</script>
```

---

集成 pinia

```shell
pnpm add pinia

pnpm add @pinia/nuxt
```

在 `nuxt.config.ts` 中，进行配置：

demo-project\03-hello-nuxt\nuxt.config.ts

```typescript
export default defineNuxtConfig({
  modules: ['@pinia/nuxt']
})
```



在 store 目录下，创建 home.ts 文件。

在 actions 中，使用封装好的网络请求。

位 state 指定类型。

给网络请求的返回值，指定类型。

demo-project\oppo-nuxt\service\home.ts

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

demo-project\oppo-nuxt\store\home.ts

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

在 default.vue 布局中，派发 homeStore 的 action，获取 navbar 数据。

将数据传给 navbar

demo-project\oppo-nuxt\layouts\default.vue

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

在 navbar 中，接收数据。

demo-project\oppo-nuxt\components\navbar\index.vue

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
      <div class="content-left">
        <NuxtLink to="/">
          <img class="logo" src="@/assets/images/logo.png" alt="logo" />
          <!-- SEO 优化 -->
          <h1 class="title">OPPO商城</h1>
        </NuxtLink>
      </div>
      <ul class="content-center">
        <template v-for="(item, index) of listData" :key="item.id">
          <li :class="{ active: currentIndex === index }">
            <NuxtLink class="link" :to="getPagePath(item)" @click="onNavBarItemClick(index)">
              {{ item.title }}
            </NuxtLink>
          </li>
        </template>
      </ul>
      <div class="content-right">
        <search></search>
      </div>
    </div>
  </div>
</template>
```

---

创建 server、onePlus、intelligence 三个页面。

---

在项目中，集成 Element Plus

1.安装依赖：

```shell
pnpm add element-plus

pnpm add unplugin-element-plus -D
```

2.配置 Babel 对 EP 的转译，配置自动导入样式；

在 `nuxt.config.ts` 中，进行配置：

并配置自动导包；

demo-project\03-hello-nuxt\nuxt.config.ts

```typescript
import ElementPlus from 'unplugin-element-plus/vite';

export default defineNuxtConfig({
  build: {
    // 使用 babel 进行语法转换
    transpile: ['element-plus/es'],
  },
  vite: {
    plugins: [ElementPlus()]
  }
})
```

---

在首页，编写轮播图。

在 components 目录下，创建 swiper/index.vue

在其中，使用 Element 的走马灯组件。

demo-project\oppo-nuxt\pages\index.vue

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

在 index.vue 中，获取 homeStore 中的 banners。

将 banners，传递给

自定义轮播图的指示器

demo-project\oppo-nuxt\components\swiper\index.vue

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

---

在 components 目录下，创建 tab-category/index.vue

在 index.vue 中，将 categoriys 数据，传递给 tab-category 中。

使用编程时导航，编写 item 点击功能。

demo-project\oppo-nuxt\components\tab-category\index.vue

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

---

封装 section-title 组件。

demo-project\oppo-nuxt\components\section-title\index.vue

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

创建 grid-view 组件，用于展示商品图片。

在其中接收 category 的数据

demo-project\oppo-nuxt\components\grid-view\index.vue