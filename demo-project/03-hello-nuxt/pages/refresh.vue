<template>
  <div class="refresh">
    refresh
    {{ pending }}
    <div>
      <button @click="refreshPage">点击刷新</button>
    </div>
  </div>
</template>

<script setup lang="ts">
const BASE_URL = "http://codercba.com:9060/juanpi/api";
interface IResultData {
  code: number;
  data: any;
}

const count = ref(1);

// 1.点击刷新时, 是在server端发起网络请求, 客户端不会发起网络请求,水合之后客户端是可以当前数据
const { data, refresh, pending } = await useFetch<IResultData>(
  BASE_URL + "/goods",
  {
    method: "POST",
    body: {
      count,
    },
  }
);
console.log(data.value?.data);

function refreshPage() {
  count.value++; // 会自动从新发起网络请求
  // refresh(); // client 刷新请求
}
</script>
