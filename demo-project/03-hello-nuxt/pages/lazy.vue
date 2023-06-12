<script lang="ts" setup>
const BASE_RUL = 'http://codercba.com:9060/juanpi/api'

interface IResultData {
  code: number
  data: any
}
/* const { data } = await useFetch<IResultData>('/goods', {
  method: 'POST',
  baseURL: BASE_RUL,
  body: {
    count: 2
  },
  lazy: true // 不会阻塞页面的导航
}) */

const { data } = await useLazyFetch<IResultData>('/goods', {
  method: 'POST',
  baseURL: BASE_RUL,
  body: {
    count: 2
  },
})

watch(data, (newVal) => {
  console.log('data newVal:', newVal)
})

onMounted(() => {
  console.log('lazy onmounted~')
})
</script>

<template>
  <div>
    Page: Lazy
  </div>
</template>

<style scoped></style>
