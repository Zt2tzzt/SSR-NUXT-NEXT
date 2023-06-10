<script lang="ts" setup>
const route = useRoute()
const id = route.params.id

definePageMeta({
  validate: (route) => {
    return /^\d+$/.test(route.params.id as string)

    /* return {
      statusCode: 401,
      statusMessage: 'validate router error'
    } */
  }
})
</script>

<template>
  <div>
    Page: detail02/{{ id }}
  </div>
</template>

<style scoped></style>
