Nuxt 配置

nuxt.config.js

appConfig 配置。

在 nuxt.config.js 中，配置 appConfig

demo-project\03-hello-nuxt\nuxt.config.ts

```js
export default defineNuxtConfig({
  appConfig: {
    title: "Hello Nuxt3 ZZT",
    theme: {
      primary: 'yellow'
    }
  }
})

```

在 app.vue 中，读取 appConfig 的配置。

demo-project\03-hello-nuxt\app.vue

```vue
<script setup>
// 获取 appConfig
const appConfig = useAppConfig() //不需要导包
// 在 server 和 client 两端，都可以使用。
console.log('appConfig.title:', appConfig.title)
console.log('appConfig.theme.primary:', appConfig.theme.primary)
  
// 生命周期，只会在客户端运行。
onMounted(() => {
  document.title = appConfig.title
})
</script>
```

将 appConfig 的配置，抽取到 app.config.ts 文件中。

demo-project\03-hello-nuxt\app.config.ts

```js
export default defineAppConfig({
  title: 'Hello Nuxt3 ZZT',
  theme: {
    primary: 'yellow'
  }
})
```

---

app 配置

这些配置，对所有后端渲染的页面生效。

在 nuxt.config.ts 中，配置 app

demo-project\03-hello-nuxt\nuxt.config.ts

```js
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: 'ZZT',
      charset: 'UTF-8',
      viewport: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no',
      meta: [
        {
          name: 'keywords',
          content: 'ZZT SEO'
        },
        {
          name: 'description',
          content: '手机商城 zzt'
        }
      ],
      link: [
        {
          rel: 'shortcut icon',
          href: 'favicon-ico',
          type: 'image/x-icon'
        }
      ],
      style: [
        {
          children: 'body { color: red; }'
        }
      ],
      script: [
        {
          src: 'http://codercba.com'
        }
      ]
    }
  }
})
```

在 app.vue 页面中，覆盖该配置：

详见[官方文档](https://nuxt.com/docs/api/composables/use-head)。

demo-project\03-hello-nuxt\app.vue

```vue
<script setup>
// 动态的覆盖 nuxt.config.ts 中，app 的配置。
useHead({
  title: 'app useHead',
  meta: [
    {
      name: 'desc',
      content: 'ABCDEFG'
    }
  ],
  bodyAttrs: {
    class: 'zzt'
  },
  // 也支持以下的配置：
  style: [],
  link: [],
  script: [
    {
      src: 'http://codercba.com',
      body: true
    }
  ],
})
</script>
```

在 app.vue 中，也可以使用 Nuxt 的内置组件，来覆盖这些配置。

demo-project\03-hello-nuxt\app.vue

```vue
<template>
  <div>
    <h2>Hello Nuxt3</h2>
    <Head>
      <Meta name="key" content="key key key"></Meta>
    </Head>
    <!-- next/ui 组件库的组件 -->
    <!-- <NuxtWelcome /> -->
  </div>
</template>
```

优先级：内置组件 > useHead ? nuxt.config.js

---

ssr 配置

指定渲染模式。

---

router 配置

指定路由的模式，在 SSR 应用中，只能使用 history 模式。

将 ssr: false，才能使用 Hash 模式。

demo-project\03-hello-nuxt\nuxt.config.ts

```js
export default defineNuxtConfig({
  router: {
    options: {
      hashMode: true
    }
  }
})
```

---

runtimeConfig 和 appConfig 有什么不同？

---

Nuxt3 内置组件

详见[官方文档](https://nuxt.com/docs/getting-started/seo-meta#components)。

NuxtPage 组件

创建 pages 目录，在其中创建 index.vue 页面。

demo-project\03-hello-nuxt\pages\index.vue

```vue
<script setup lang="ts">

</script>

<template>
  <div class="home">
    <h1>home</h1>
    <p>我是 Home Page</p>
  </div>
</template>

<style scoped lang="less">

</style>
```

此时页面会报错，这是因为，创建的页面，自动生成了路由。

在 app.vue 中，添加路由占位。

demo-project\03-hello-nuxt\app.vue

```vue
<template>
  <div>
    <h2>Hello Nuxt3</h2>
    <NuxtPage></NuxtPage>
  </div>
</template>
```



ClientOnly 组件

指定内容只在客户端渲染。

demo-project\03-hello-nuxt\pages\index.vue

```vue
<template>
  <div class="home">
    <h1>home</h1>
    <p>我是 Home Page</p>

    <ClientOnly fallback-tag="h3" fallback="Loading...">
      <p>我只会在 client 渲染~</p>
    </ClientOnly>

    <ClientOnly>
      <p>我只会在 client 渲染~</p>
      <template #fallback>
        <h3>Loading...</h3>
      </template>
    </ClientOnly>
  </div>
</template>
```

---

全局样式

在 app.vue 中，编写全局样式。

demo-project\03-hello-nuxt\app.vue

```vue
<stylew>
.global-style {
  color: red;
}
</stylew>
```

在页面中使用。

demo-project\03-hello-nuxt\pages\index.vue

```vue
<template>
  <div class="home">
    <h1>home</h1>
    <p class="global-style">我是 Home Page</p>
  </div>
</template>
```



另一种方式：

在 assets 目录i下，创建 styles 目录。

demo-project\03-hello-nuxt\assets\styles\main.css

```css
/* 全局杨思 */
.global-style1 {
  color: green;
}
```

在 nuxt.config.js 中，配置 css 选项：

demo-project\03-hello-nuxt\nuxt.config.ts

```js
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: [
    '@/assets/styles/main.css'
  ]
})
```



对 less 的支持：

安装 less

```shell
pnpm add less
```

在 assets 目录i下，编写 main.less

demo-project\03-hello-nuxt\assets\styles\main.less

```less
// 全局杨思
@color: blue;

.global-style2 {
  color: @color;
}
```

在 nuxt.config.js 中，配置 css 选项：

demo-project\03-hello-nuxt\nuxt.config.ts

```js
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: [
    '@/assets/styles/main.css',
    '@/assets/styles/main.less'
  ]
})
```

在页面中应用全局样式。

demo-project\03-hello-nuxt\pages\index.vue

```vue
<template>
  <div class="home">
    <h1>home</h1>
    <p>我是 Home Page</p>

    <ClientOnly fallback-tag="h3" fallback="Loading...">
      <p class="global-style">我只会在 client 渲染~</p>
    </ClientOnly>

    <ClientOnly>
      <p class="global-style1">我只会在 client 渲染~</p>
      <template #fallback>
        <h3>Loading...</h3>
      </template>
    </ClientOnly>

    <p class="global-style2">哈哈哈哈哈哈哈哈哈哈哈</p>
  </div>
</template>
```



手动导入全局变量的使用：

在 assets 中，编写样式的变量。

demo-project\03-hello-nuxt\assets\styles\variable.less

```less
// 定义全局的SCSS变量
@fsColor: purple;
@fs20: 20px;

// 混合
.border {
  border: 1px solid red;
}
```

在页面中，引入定义变量的文件，并应用变量。

demo-project\03-hello-nuxt\pages\index.vue

```vue
<template>
	<div>
    <p class="style-variable">样式变量应用。</p>
  </div>
</template>

<style scoped lang="less">
@import url('@/assets/styles/variable.less');

// scss 的语法
// @use 和 @import
// as vb: 给这个模块起一个命名空间
// as * : 可以省略命名空间
// @use "~/assets/styles/variable.less" as bv;
// @use "~/assets/styles/variable.less" as *;

.style-variable {
  color: @fsColor;
  font-size: @fs20;
  .border()
}
</style>
```



自动导入全局变量：

详见[官方文档](https://nuxt.com/docs/getting-started/assets#global-styles-imports)，用于导入 scss 样式。

会在每个 scss 作用域，自动导入变量。

---

资源导入：