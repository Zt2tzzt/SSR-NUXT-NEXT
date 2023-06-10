<script lang="ts" setup>
const route = useRoute()
const { slug } = route.params;
</script>

<template>
  <div>
    Page: 404 Not Found page
    slug: {{ slug }}
  </div>
</template>

<style scoped></style>
