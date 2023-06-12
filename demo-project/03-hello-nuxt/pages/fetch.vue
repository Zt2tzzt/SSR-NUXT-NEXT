<script lang="ts" setup>
const BASE_RUL = 'http://codercba.com:9060/juanpi/api'

// 1.使用 $fetch 来发送网络请求.
// 服务端，客户端，都会发送，会发送两次
/* $fetch(BASE_RUL + '/homeInfo', {
  method: 'GET',
}).then(res => {
  console.log('res:', res)
}) */

// 2.使用官方提供的 Hooks API。
// useAsyncData 在刷新页面时，可减少客户端发起的一次网络请求。
// 第一个参数，为一个唯一id，通常是是请求 url
interface IResultData {
  code: number
  data: any
}
const { data } = await useAsyncData<IResultData>('homeinfo', () => {
  return $fetch(BASE_RUL + '/homeInfo', { method: 'GET' })
})
console.log('data:', data.value?.data)
console.log('data:', data.value?.code)

const { data: newData } = await useFetch<IResultData>('/goods', {
  method: 'POST',
  baseURL: BASE_RUL,
  body: {
    count: 2
  },
  /* query: {
    name: 'zzt'
  }, */
  // params: {}, // query 的别名
  // headers: {}

  // 请求的拦截其
  onRequest({ request, options }) {
    console.log('options:', options)
    console.log('options.method:', options.method)
    // 添加请求头。
    /* options.headers = {
      token: 'xxxx'
    } */
  },
  // 请求错误的拦截其
  onRequestError({request, options, error}) {
    console.log('onRequestError~')
  },
  onResponse({ request, response, options}) {
    console.log('onResponse~')
    console.log('response._data:', response._data)
    // return response._data // 不能返回到 data，除非重写它
    response._data.data = {
      name: 'zzt'
    }
  },
  onResponseError({request, response, options, error}) {
    console.log('onResponseError~')
  }
})
console.log('newData:', newData.value?.data)
console.log('newData:', newData.value?.data)
</script>

<template>
  <div>Page: Fetch</div>
</template>

<style scoped></style>
