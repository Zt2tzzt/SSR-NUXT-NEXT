<script lang="ts" setup>
const route = useRoute()
const { role, id } = route.params;
</script>

<template>
  <div>
    Page: detail04-{{ role }}/{{ id }}
  </div>
</template>

<style scoped></style>
