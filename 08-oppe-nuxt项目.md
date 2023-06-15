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

将之前封装好的 service，拷贝到项目中。修改 BASE_URL

demo-project\oppo-nuxt\service\index.ts



在 default.vue 布局中，发送网络请求。
