<script setup>
// 1.获取运行时配置（server and client）
const runtimeConfig = useRuntimeConfig()

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

</script>

<template>
  <div>
    <h2>Hello Nuxt3</h2>
    <!-- <Head>
      <Meta name="key" content="key key key"></Meta>
    </Head> -->
    <!-- next/ui 组件库的组件 -->
    <!-- <NuxtWelcome /> -->
    <NuxtPage></NuxtPage>
  </div>
</template>

<style>
.global-style {
  color: red;
}
</style>
