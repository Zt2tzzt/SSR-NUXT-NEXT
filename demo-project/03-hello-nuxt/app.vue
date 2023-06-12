<script setup>
// 1.获取运行时配置（server and client）
const runtimeConfig = useRuntimeConfig()
import avatarPng from '@/assets/images/avatar.png';

if (process.server) {
  console.log('运行在 server~')
  console.log('runtimeConig.appKey:', runtimeConfig.appKey)
  console.log('runtimeConig.public.baseURL:', runtimeConfig.public.baseURL)
}

if (process.client) {
  console.log('运行在 client~')
  console.log('runtimeConig.public.baseURL:', runtimeConfig.public.baseURL)
}

if (typeof window === 'object') {
  console.log('运行在 client~')
}

// console.log('process.env.appKey:', process.env.appKey)

// 获取 appConfig
const appConfig = useAppConfig() //不需要导包
// 在 server 和 client 两端，都可以使用。
console.log('appConfig.title:', appConfig.title)
console.log('appConfig.theme.primary:', appConfig.theme.primary)

// 生命周期，只会在客户端运行。
onMounted(() => {
  document.title = appConfig.title
})

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

function goToCategory() {
  return navigateTo('/category')
}

function goToCart() {
  return navigateTo({
    path: '/cart',
    query: {
      id: 100
    }
  }, {
    replace: true
  })
}

function goToJd() {
  return navigateTo('https://www.jd.com', {external: true})
}

/* const router = useRouter()
router.beforeEach((to, form) => {
  console.log('to:', to)
  console.log('form:', form)
}) */

// 编写插件
const nuxtApp = useNuxtApp()
nuxtApp.provide('formatData', () => {
  return '2023-06-11'
})
nuxtApp.provide('version', 'v1.0.0')

console.log('formatData:', nuxtApp.$formatData())
console.log('version:', nuxtApp.$version)
if (process.client)  {
  console.log('formatPrice:', nuxtApp.$formatPrice(100.875638))
}
</script>

<template>
  <div>
    <h2>Hello Nuxt3</h2>
    <!-- <Head>
      <Meta name="key" content="key key key"></Meta>
    </Head> -->

    <!-- 资源导入，图片 -->
    <img :src="avatarPng" alt="">
    <div class="bg-publick"></div>

    <!-- 资源导入：字体图标 -->
    <i class="iconfont icon-shouye"></i>

    <h3>组件导航</h3>
    <NuxtLink to="/">
      <button>home</button>
    </NuxtLink>
    
    <NuxtLink :to="{
      path: '/category',
      query: {
        id: 10
      }
    }">
      <button>category</button>
    </NuxtLink>
    <NuxtLink to="/cart" active-class="haha" :replace="true">
      <button>cart</button>
    </NuxtLink>
    <NuxtLink to="/profile">
      <button>profile</button>
    </NuxtLink>
    <NuxtLink to="https://www.jd.com" target="_blank">
      <button>js.com</button>
    </NuxtLink>

    <h3>编程导航</h3>
    <button @click="goToCategory">category</button>
    <button @click="goToCart">cart</button>
    <button @click="goToJd">JD.com</button>

    <h3>动态路由</h3>
    <NuxtLink to="/detail01?name=zzt">
      <button>detail01?mame=zzt</button>
    </NuxtLink>
    <NuxtLink to="/detail02">
      <button>detail02</button>
    </NuxtLink>
    <NuxtLink to="/detail02/233">
      <button>detail02/id</button>
    </NuxtLink>
    <NuxtLink to="/detail03/user-666">
      <button>detail03/user-id</button>
    </NuxtLink>
    <NuxtLink to="/detail04-admin">
      <button>detail04-admin</button>
    </NuxtLink>
    <NuxtLink to="/detail04-admin/233">
      <button>detail04-admin/233</button>
    </NuxtLink>
    <NuxtLink to="/detail05">
      <button>detail05</button>
    </NuxtLink>

    <!-- 嵌套路由 -->
    <NuxtLink to="/parent">
      <button>parent</button>
    </NuxtLink>

    <h3>自定义布局</h3>
    <NuxtLink to="/login">
      <button>login</button>
    </NuxtLink>
    <!-- next/ui 组件库的组件 -->
    <!-- <NuxtWelcome /> -->

    <h3>生命周期</h3>
    <NuxtLink to="/lifecycle">
      <button>lifecycle</button>
    </NuxtLink>

    <h3>网络请求</h3>
    <NuxtLink to="/fetch">
      <button>fetch</button>
    </NuxtLink>
    <NuxtLink to="/lazy">
      <button>lazy</button>
    </NuxtLink>
    <NuxtLink to="/refresh">
      <button>refresh</button>
    </NuxtLink>
    <NuxtLink to="/use-fetch">
      <button>use-fetch</button>
    </NuxtLink>

    <!-- 会自动加载默认布局：/layout/default.vue -->
    <NuxtLayout>
      <NuxtPage></NuxtPage>
    </NuxtLayout>
  </div>
</template>

<style>
.global-style {
  color: red;
}

.haha button {
  color: red;
}

.iconfont {
  font-size: 30px;
}

.bg-publick {
  width: 200px;
  height: 200px;
  border: 1px solid red;
  background-image: url(@/assets/images/avatar.png);
}
</style>
