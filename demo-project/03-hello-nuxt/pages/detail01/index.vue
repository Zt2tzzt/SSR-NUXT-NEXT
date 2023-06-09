<script lang="ts" setup>
const route = useRoute()
const { name } = route.query;
</script>

<template>
  <div>
    Page: detail01?name={{ name }}
  </div>
</template>

<style scoped></style>
