# oppo-nuxt项目 & 项目部署

## 一、首页

### 1.商品区域

在 grid-view 中，第一个 item，占据宽度 40%。

在其中，接收图片的 url，categoryUrl

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

在首页 `index.vue` 中，

抽取分类章节组件 section-category。

components\section-category\index.vue

```vue
<script setup lang="ts">
import type { ICategory } from '~/types/home'

interface IProps {
  itemData?: ICategory | null
}
withDefaults(defineProps<IProps>(), {
  itemData: null
})
</script>

<template>
  <div class="section-itemData" v-if="!!itemData">
    <SectionTitle :title="itemData.title"></SectionTitle>
    <GridView
      :itemData-url="itemData.url"
      :productsDetails="itemData.productDetailss"
    ></GridView>
  </div>
</template>

<style scoped lang="scss"></style>
```

在首页 `index.vue` 中，使用该组件，对它进行遍历。

pages\index.vue

```vue
<!-- 商品区域-->
<template v-for="item of categorys" :key="item.id">
  <SectionCategory :category="item"></SectionCategory>
</template>
```

## 二、布局

编写 app-footer 组件。

components\app-footer\index.vue

## 三、onePlus 页面

在 `onePlus/index.vue` 中，发送网络请求，获取数据。

判断，没有产品详情的商品区域，不展示。

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
        <!-- 没有产品详情的，不展示商品区域 -->
        <SectionCategory :itemData="item" v-if="!!(item.productDetailss) && item.productDetailss.length > 0"></SectionCategory>
      </template>
    </div>
  </div>
</template>

<style scoped></style>
```

## 四、智能硬件页面

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
        <!-- 没有产品详情的，不展示商品区域 -->
        <SectionCategory :itemData="item" v-if="!!(item.productDetailss) && item.productDetailss.length > 0"></SectionCategory>
      </template>
    </div>
  </div>
</template>

<style scoped></style>
```

## 五、详情页

在首页 `index.vue`；

点击 tab-category 中的 item，跳转到详情页 oppo-detail。

通过编程导航的方式，跳转路由，在 query 字符串中，传递 `type` 参数。

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
import type { IDetailProductType, IDetailData } from '@/types/detail.d';
import type { IResultData } from '@/types/global.d';
import ztRequest from './index'

export const getDetailInfo = (type: IDetailProductType) => ztRequest.get<IResultData<IDetailData>>('/oppoDetail', { type })
```

创建 oppo-detail 页面

在其中，通过路由，获取 query 字符串，传递过来的参数 `type`；

发送网络请求，传入 `type`，获取详情数据：

pages\oppo-detail\index.vue

```vue
<script setup lang="ts">
import { getDetailInfo } from '@/service/detail';
import type { IDetailProductType } from '~/types/detail';

const route = useRoute()
console.log('route.query:', route.query)

const { data } = await getDetailInfo(route.query.type as IDetailProductType);
console.log('data.value?.data:', data.value?.data)
</script>
```

### 1.el-tabs

在 oppo-detail 页面中，编写”标签组件“，使用 EP 的 el-tabs、eb-tab-pane 组件。

并编写样式。使用 `:deep` “样式穿透”，重写 EP 组件的样式。

复用封装好的 grid-view 组件。

pages\oppo-detail\index.vue

```vue
<script setup lang="ts">
import { getDetailInfo } from '@/service/detail'
import type { IDetailProductType } from '~/types/detail'
import type { TabsPaneContext } from 'element-plus'
import { ElTabs, ElTabPane } from 'element-plus'
import { ref } from 'vue'

// 路由：获取请求参数
const route = useRoute()
console.log('route.query:', route.query)

// 网络请求：发送网络请求
const { data } = await getDetailInfo(route.query.type as IDetailProductType)
console.log('data.value?.data:', data.value?.data)

// 状态：激活的 tab 名称。
const activeName = ref(data.value?.data[0].title)

// 事件处理：tab 点击事件
const handleClick = (tab: TabsPaneContext, event: Event) => {
  // console.log(tab, event)
}
</script>

<template>
  <div class="oppo-detail">
    <div class="wrapper content">
      <el-tabs v-model="activeName" class="oppo-tabs" @tab-click="handleClick">
        <template v-for="item of data?.data" :key="item.id">
          <el-tab-pane :label="item.title" :name="item.title">
            <GridView :productsDetails="item.productDetailss"></GridView>
          </el-tab-pane>
        </template>、
      </el-tabs>
    </div>
  </div>
</template>

<style scoped lang="scss">
.oppo-detail {
  background-color: $bgGrayColor;
  padding-bottom: 60px;
  padding-top: 8px;

  .content {
    .oppo-tabs {
      /* 背景 */
      :deep(.el-tabs__header) {
        background-color: white;
      }

      :deep(.el-tabs__nav-wrap) {
        height: 48px;
        padding: 0 52px;
        /* 底部线 */
        &::after {
          background-color: white;
        }
        /* 按钮 */
        .el-tabs__nav-prev,
        .el-tabs__nav-next {
          width: 48px;
          .el-icon,
          svg {
            width: 25px;
            height: 25px;
          }
          svg {
            position: relative;
            top: 10px;
          }
        }

        /* 移动线条激化样式 */
        .el-tabs__nav-next + .el-tabs__nav-scroll .el-tabs__active-bar {
          /* left: 0px; */
        }
        .el-tabs__active-bar {
          background-color: $priceColor;
          /* left: 48px; */
        }
      }

      :deep(.el-tabs__item) {
        height: 48px;
        opacity: 0.6;
        font-weight: 400;
        padding-top: 5px;

        position: relative;
        /* hover字体演示 */
        &:hover,
        &.is-active {
          color: $priceColor;
        }
      }
    }
  }
}
</style>
```

## 六、项目打包

执行命令，打包项目：

项目目录不能出现中文路径，否则会出错。

```shell
pnpm build
```

## 七、项目部署

1.在阿里云，按量付费，购买 ECS 实例。

2.选择 CentOS 系统。

3.开通安全组。

4.配置 root 帐号的密码。

5.ssh 远程连接服务器。

6.在服务器上，安装 nodejs，使用 CentOS 自带的 yarn 工具（不会自动安装 npm）。

```shell
yum install nodejs
```

7.手动安装 npm。

```shell
yum install npm
```

8.将本地打包后的项目，拖入到远程服务器目录中。

9.在远程服务器，运行项目：

```shell
node .output/server/index.mjs 
```

指定端口，运行项目：

- PORT：是动态添加的环境变量

```shell
PORT=8888 node .output/server/index.mjs
```

10.安装 *pm2*

- *PM2* 是一个进程管理器, 帮助管理和保持在线应用程序；
- 比如：负责管理 Node、Python 等程序，一直保持在后台运行。

```shell
npm install pm2 -g
```

使用 pm2 启动项目。

```shell
PORT=8888 pm2 start .output/server/index.mjs --name oppo-web
```

为 pm2 生成配置文件。

```shell
pm2 init simple
```

在目录中，生成 `ecosystem.config.js` 文件，在其中进行配置：

```js
module.exports = {
  apps: [
    {
      name: 'oppo-nuxt-web',
      script: "./.output/server/index.mjs",
      // instances: max // 根据服务器 CPU 核数，创建进程，如 2 核，会创建 2 个进程。
      instances: 5, // 指定启动实例（进程）的个数 5 个。
      exec_mode: "cluster", // 运行的模式："cluster"（集群模式，负载均衡）、"fork"（默认）；
      env: {
        PORT: 8080
      }
    }
  ]
}
```

使用配置文件，启动项目：

```shell
pm2 start ecosystem.config.js
```

> 【补充】：另一种负载均衡：
>
> 购买多台服务器，在其中分别部署项目，使用 pm2 开启多进程，实现负载均衡。
>
> 再在多个服务器之间，使用 nginx，配置负载均衡。
