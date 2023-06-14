创建项目

```shell
pnpm dlx nuxi init oppo-nuxt
```

初始化样式：

安装 normalize.css

```shell
pnpm add normalize.css
```

在 nuxt.config.ts 中，配置 css

demo-project\oppo-nuxt\nuxt.config.ts

```typescript
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['normalize.css']
})
```

安装 sass

```shell
pnpm add sass
```

创建 assets 目录，在其中创建 css 目录，在其中创建 global.scss

```scss
body {
  font-size: 14px;
  color: #333;
}

ul {
  list-style: none;
}

ul, li {
  margin: 0;
  padding: 0;
}

a {
  text-decoration: none;
}

.wrapper {
  width: 1248px;
  margin: 0 auto;
}
```

在 nuxt.config.ts 中，配置 css

demo-project\oppo-nuxt\nuxt.config.ts

```typescript
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: [
    'normalize.css',
    '~/assets/css/global.scss'
  ]
})
```

引入静态资源 public，assets/images，assets/css/variables.scss

在 nuxt.config.ts 中，导入全局变量。

```typescript
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['normalize.css', '~/assets/css/global.scss'],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/css/global.scss" as *;'
        }
      }
    }
  }
})
```

> 没做完一步操作，多测试，不然不知道问题出在哪。

---

创建布局

创建 layouts 目录，在其中创建 default.vue 文件。

创建 components 目录，在其中创建 app-header 和 app-footer 组件。

在 default.vue 中，引入 app-header 和 app-footer

demo-project\oppo-nuxt\layouts\default.vue

```vue
<script setup lang="ts">

</script>

<template>
  <div class="default-layout">
    <!-- header -->
    <app-header></app-header>
    <slot></slot>
    <!-- footer -->
    <app-footer></app-footer>
  </div>
</template>

<style scoped lang="less">

</style>
```

在 app.vue 中，使用 `<NauxtLayout>`：

demo-project\oppo-nuxt\app.vue

```vue
<template>
  <div>
    <NuxtLayout>
      NuxtWelcome
    </NuxtLayout>
  </div>
</template>
```



编写 app-header 组件。

在其中使用字体图标。在项目中引入后，在 nuxt.config.ts 中，配置。

demo-project\oppo-nuxt\nuxt.config.ts

```typescript
export default defineNuxtConfig({
  css: ['normalize.css', '~/assets/css/global.scss', '~/assets/css/cus-font/iconfont.css'],
})
```

demo-project\oppo-nuxt\components\app-header\index.vue

---

header 的 SEO 优化

demo-project\oppo-nuxt\nuxt.config.ts

```typescript
export default defineNuxtConfig({
  app: {
    // 可以给所有的页面的head添加一下SEO的信息
    head: {
      title: '弘源OPPO手机商城',
      meta: [
        {
          name: 'description',
          content: 'OPPO专区，官方正品，最新最全的OPPO手机产品以及配件在线抢购！'
        },
        {
          name: 'keywords',
          content: 'OPPO商城，OPPO专区, OPPO手机，OPPO配件，OPPO, OPPO官网商城'
        },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
      noscript: [{ children: 'Javascript is required' }]
    }
  }
})
```

---

在 pages 目录下，创建主页 index.vue。

在 app.vue 中，使用路由占位 `<NuxtPage>`；

创建全局 404 not found 页面

demo-project\oppo-nuxt\pages\[...slug].vue

```vue
<script setup lang="ts">

</script>

<template>
  <div class="page-not-found">
    <h1>404 page-not-found</h1>
  </div>
</template>
```

创建 login 页面、register 页面。

```shell
npx nuix add page login/index
```

在 app-header 中，补充 login、register 的路由。

demo-project\oppo-nuxt\components\app-header\index.vue

```vue
<NuxtLink to="/login" class="link">
  <i class="iconfont icon-user"></i>
  <span>登录</span>
</NuxtLink>
<NuxtLink to="/register" class="link">
  <span>注册</span>
</NuxtLink>
```

---

在 login、register 页面，不要 header、footer。

创建一个新的布局 empty-layout

demo-project\oppo-nuxt\layouts\empty-layout.vue

```vue
<template>
  <div class="empty-layout">
    <slot></slot>
  </div>
</template>
```

在 login、register 页面中，进行配置

demo-project\oppo-nuxt\pages\login\index.vue

```vue
<script lang="ts" setup>
definePageMeta({
  layout: 'empty-layout'
})
</script>
```

