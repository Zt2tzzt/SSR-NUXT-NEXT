<script setup lang="ts">
definePageMeta({
  // 路由中间件（监听路由）
  middleware: [
    function (to, from) {
      console.log('执行中间件1~')
      //  return navigateTo('/detail02')
      // return abortNavigation('终止导航')
    },
    // 命名中间件
    'home',
    function (to, from) {
      console.log('执行中间件3~')
    }
  ]
})

const cookie = useCookie('token')
console.log('cookie value:', cookie.value)
</script>

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
  .border();
}
</style>
