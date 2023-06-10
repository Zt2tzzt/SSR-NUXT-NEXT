<script lang="ts" setup></script>

<template>
  <div>
    Page: Parent
    <div></div>
    <!-- 路由连接 -->
    <NuxtLink to="/parent">
      <button>default</button>
    </NuxtLink>
    <NuxtLink to="/parent/child1">
      <button>child1</button>
    </NuxtLink>
    <NuxtLink to="/parent/child2">
      <button>child2</button>
    </NuxtLink>

    <!-- 添加路由占位 -->
    <NuxtPage></NuxtPage>
  </div>
</template>

<style scoped></style>
