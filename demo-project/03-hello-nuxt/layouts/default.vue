<script setup lang="ts">
</script>

<template>
  <div class="layout-default">
    <div class="header">我是 header</div>
    <slot></slot>
    <div class="footer">我是 footer</div>
  </div>
</template>

<style scoped lang="less">
.header {
  border: 1px solid red;
  text-align: center;
  line-height: 80px;
  background-color: red;
}

.footer {
  border: 1px solid green;
  text-align: center;
  line-height: 80px;
  background-color: #cdcdcd;
}
</style>