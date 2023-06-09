<script lang="ts" setup>
const route = useRoute()
const id = route.params.id
</script>

<template>
  <div>
    Page: detail02/{{ id }}
  </div>
</template>

<style scoped></style>
