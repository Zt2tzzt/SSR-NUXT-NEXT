<script lang="ts" setup>
const route = useRoute()
const { id } = route.params;
</script>

<template>
  <div>
    Page: detail03/user-{{ id }}
  </div>
</template>

<style scoped></style>
