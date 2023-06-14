<script lang="ts" setup>

const counter = useCounter()
</script>

<template>
  <div>
    Page: foo
    <h3>useState</h3>
    <div>counter: {{ counter }}</div>
  </div>
</template>

<style scoped></style>
