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

// 监听全局路由

</script>

<template>
  <div>
    Hello Nuxt3
    <!-- next/ui 组件库的组件 -->
    <!-- <NuxtWelcome /> -->
  </div>
</template>
