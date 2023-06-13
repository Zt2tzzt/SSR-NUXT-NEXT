<script lang="ts" setup>
definePageMeta({
  layout: 'custome-layout'
})

const { data } = await useFetch('/api/homeInfo', { method: 'POST' })
console.log('login data:', data.value?.data)


async function onLoginrequestClick() {

  const { data: loginData } = await useFetch('/api/login?id=100', {
    method: 'POST',
    body: {
      username: 'admin',
      password: '1234567'
    }
  })

  console.log('logindata:', loginData.value?.data)

  // Server & Client
  const cookie = useCookie('token', {
    maxAge: 60 // 1 分钟后过期
  })
  cookie.value = loginData.value?.data.token as string
  return navigateTo('/')
}
</script>

<template>
  <div>
    Page: Login
  </div>
  <div>
    <button @click="onLoginrequestClick">login request</button>
  </div>
</template>

<style scoped></style>
