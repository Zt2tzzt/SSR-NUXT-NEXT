<script lang="ts" setup>
const route = useRoute()
const { role } = route.params;
</script>

<template>
  <div>
    Page: detail04-{{ role }}
  </div>
</template>

<style scoped></style>
