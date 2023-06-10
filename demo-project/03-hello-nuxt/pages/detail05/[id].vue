<script lang="ts" setup>
const route = useRoute()
const { id } = route.params;
</script>

<template>
  <div>
    Page: detail05/{{ id }}
  </div>
</template>

<style scoped></style>
