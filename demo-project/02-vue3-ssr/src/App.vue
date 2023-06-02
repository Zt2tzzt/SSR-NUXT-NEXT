<script setup>

import { storeToRefs } from 'pinia';
import { useHomeStore  } from './store/home';

const homeStore = useHomeStore()
const { count } = storeToRefs(homeStore)

function onAddButtonClick() {
  count.value++
}
</script>

<template>
  <div class="app" style="border: 1px solid red">
    <h1>Vue3 app</h1>
    <div>{{ count }}</div>
    <button @click="onAddButtonClick">加1</button>

    <div>
      <router-link to="/">
        <button>home</button>
      </router-link>
      <router-link to="/about">
        <button>about</button>
      </router-link>
    </div>

    <router-view></router-view>
  </div>

</template>

<style scoped></style>
