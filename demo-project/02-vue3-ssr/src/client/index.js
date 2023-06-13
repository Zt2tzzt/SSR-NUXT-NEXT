import { createApp } from 'vue';
import App from '../App.vue';
import createRouter from '../router';
import { createWebHistory } from 'vue-router';
import { createPinia } from 'pinia';

// 创建 app
const app = createApp(App)

// 创建 pinia
const pinia = createPinia()
app.use(pinia)

// 安装路由 router
const router = createRouter(createWebHistory())

app.use(router)

router.isReady().then(() => {
  app.mount('#app')
})
