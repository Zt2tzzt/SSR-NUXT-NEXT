<script setup lang="ts">
interface IProps {
  title: string
}
withDefaults(defineProps<IProps>(), {
  title: ''
})
</script>

<template>
  <h1 class="section-title">
    {{ title }}
  </h1>
</template>

<style scoped lang="scss">
.section-title {
  padding-top: 60px;
  margin-bottom: 24px;
  font-size: 24px;
  font-weight: 500;

  /* @include border(); */
}
</style>