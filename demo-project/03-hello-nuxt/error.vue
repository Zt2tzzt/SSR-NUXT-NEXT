<script lang="ts" setup>
defineProps({
  error: Object
})

// 会首页
function onGoHomeclick() {
  // 清空错误信息，再跳转
  clearError({ redirect: '/' })
}
</script>

<template>
  <div>
    Page error {{ error }}
  </div>
  <div>
    <button @click="onGoHomeclick">go Home</button>
  </div>
</template>

<style scoped></style>
