一、邂逅 Vue3 + SSR

hydration

在 client/index.js 中，编写代码：

demo-project\02-vue3-ssr\src\client\index.js

```js
import { createApp } from 'vue';
import App from '../App.vue';

const app = createApp(App)
app.mount('#app')
```

创建 webpack.client.config.js 文件，在其中进行配置.

消除警告，使用 DefinePlugin 插件，配置全局环境变量。

demo-project\02-vue3-ssr\config\webpack.client.config.js

```js
const path = require('path')
const { DefinePlugin } = require('webpack')
// const nodeExternals = require('webpack-node-externals')
const { VueLoaderPlugin } = require('vue-loader/dist/index')

module.exports = {
  target: 'web', // 一定要配置成 web
  mode: 'development',
  entry: './src/client/index.js', // 相对于项目运行的目录。
  output: {
    filename: 'client_bundle.js',
    path: path.resolve(__dirname, '../build/client')
  },
  resolve: {
    extensions: ['.js', '.json', '.wasm', '.jsx', '.vue']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new DefinePlugin({
      __VUE_OPTIONS_API__: false,
      __VUE_PROD_DEVTOOLS__: false
    })
  ]
  // externals: [nodeExternals()] 不需要该配置，现在打包的是 web 应用程序。
}
```

在 package.json 中，进行配置

```json
{
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "nodemon ./src/server/index.js",
    "start": "nodemon ./build/server/server_bundle.js",
    "build:server": "webpack --config ./config/webpack.server.config.js --watch",
    "build:client": "webpack --config ./config/webpack.client.config.js --watch"
  },
}
```

执行命令，打包：

```shell
pnpm build:client

pnpm build:server
```

生成打包文件，

demo-project\02-vue3-ssr\build\client\client_bundle.js

并打包服务端代码。

在 src\server\index.js 中，引入打包好的 client_bundle.js 文件。

同时，要使用 express 的静态资源部署功能；

```js
const express = require('express')
import createApp from '../app';
import { renderToString } from 'vue/server-renderer';

const server = express()

// express 部署静态资源
server.use(express.static('build'))

server.get('/', async (req, res, next) => {
  const app = createApp()
  const appHtmlString = await renderToString(app)

  res.send(`
    <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
      </head>
      <body>
        <h1>Vue3 Serve Side Render</h1>
        <div id="app">
          ${appHtmlString}
        </div>

        <script src="/client/client_bundle.js"></script>
      </body>
    </html>`
  )
})

server.listen(9000, () => {
  console.log('start node server on port 9000 ~')
})
```

---

跨请求状态的污染

为什么 app.js 中，要导出一个函数？



缺点是会消耗更多服务器资源。

---

配置文件抽取

安装 *webpack-merge*

```shell
pnpm add webpack-merge -D
```

抽取 webpack.server.config.js 和 webpack.client.config.js 中的公共部分，到 webpack.base.config.js 中。

demo-project\02-vue3-ssr\config\webpack.base.config.js

```js
const path = require('path')
const { VueLoaderPlugin } = require('vue-loader/dist/index')

module.exports = {
  mode: 'development',
  entry: './src/client/index.js', // 相对于项目运行的目录。
  output: {
    filename: 'client_bundle.js',
    path: path.resolve(__dirname, '../build/client')
  },
  resolve: {
    extensions: ['.js', '.json', '.wasm', '.jsx', '.vue']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
  ]
}
```

demo-project\02-vue3-ssr\config\webpack.client.config.js

```js
const path = require('path')
const { DefinePlugin } = require('webpack')
const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base.config');

module.exports = merge(baseConfig, {
  target: 'web',
  entry: './src/client/index.js', // 相对于项目运行的目录。
  output: {
    filename: 'client_bundle.js',
    path: path.resolve(__dirname, '../build/client')
  },
  plugins: [
    new DefinePlugin({
      __VUE_OPTIONS_API__: false,
      __VUE_PROD_DEVTOOLS__: false
    })
  ]
})
```

demo-project\02-vue3-ssr\config\webpack.server.config.js

```js
const path = require('path')
const nodeExternals = require('webpack-node-externals')
const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base.config');

module.exports = merge(baseConfig, {
  target: 'node',
  entry: './src/server/index.js', // 相对于项目运行的目录。
  output: {
    filename: 'server_bundle.js',
    path: path.resolve(__dirname, '../build/server')
  },
  externals: [nodeExternals()]
})
```

---

Vue3 SSR + Vue Router

安装 vue-router：

```shell
pnpm add vue-router
```

创建 router 和 views 文件夹。

创建 Home.vue、About.vue 文件。

demo-project\02-vue3-ssr\src\views\Home.vue

demo-project\02-vue3-ssr\src\views\About.vue

同样的，为了防止跨请求状态的污染，导出一个函数。

服务器或客户端渲染，路由模式是不确定的，需要传入到这个函数中

demo-project\02-vue3-ssr\src\router\index.js

```js
import { createRouter } from 'vue-router';

const routes = [
  {
    path: '/',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/about',
    component: () => import('../views/About.vue')
  }
]

export default function (history) {
  
  return createRouter({
    history,
    routes
  })
}
```

在 App.vue 中，编写路由的占位。

demo-project\02-vue3-ssr\src\App.vue

```vue
<script setup>
import { ref } from 'vue'

const counter = ref(100)
function onAddButtonClick() {
  counter.value++
}
</script>

<template>
  <div class="app" style="border: 1px solid red">
    <h1>Vue3 app</h1>
    <div>{{ counter }}</div>
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
```

在 server/index.js 中，创建 router，传入路由模式：

路由加载完成后，再渲染页面：

无论请求怎样的路径，都会来到这个服务里，所以更改请求路径为 `/*`

demo-project\02-vue3-ssr\src\server\index.js

```js
const express = require('express')
import createApp from '../app';
import { renderToString } from 'vue/server-renderer';
import createRouter from '../router/index';
// 在 node 环境中，要用 createMemoryHistory
import { createMemoryHistory } from 'vue-router';

const server = express()

// express 部署静态资源
server.use(express.static('build'))

server.get('/*', async (req, res, next) => {
  // 创建 app
  const app = createApp()

  // 创建 router
  const router = createRouter(createMemoryHistory)
  app.use(router)
  await router.push(req.rul || '/') // 路由加载的是异步组件，返回的是 promise。
  await router.isReady() // 等待（异步）路由加载完成，再渲染页面

  const appHtmlString = await renderToString(app)

  res.send(`
    <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
      </head>
      <body>
        <h1>Vue3 Serve Side Render</h1>
        <div id="app">
          ${appHtmlString}
        </div>

        <script src="/client/client_bundle.js"></script>
      </body>
    </html>`
  )
})

server.listen(9000, () => {
  console.log('start node server on port 9000 ~')
})
```

再 client/index.js 中，进行相同的操作：

demo-project\02-vue3-ssr\src\client\index.js

```js
import { createApp } from 'vue';
import App from '../App.vue';
import createRouter from '../router';
import { createWebHistory } from 'vue-router';

const app = createApp(App)

const router = createRouter(createWebHistory())

app.use(router)

router.isReady().then(() => {
  app.mount('#app')
})
```

执行命令：

```shell
pnpm build:server

pnpm build:client

pnpm start
```

---

Vue3 SSR + Pinia

安装 pinia

```shell
pnpm add pinia
```

同样的，再服务端和客户端，都要创建 pinia 对象。

服务端的 pinia，会把状态转成字符串的形式，存放在 window 对象上；

在 hydration 时，注入到客户端 window 对象上，以便使用。



创建 store 文件夹。

创建 homeStore

demo-project\02-vue3-ssr\src\store\home.js

```js
import { defineStore } from 'pinia';

export const useHomeStore = defineStore('home', {
  state() {
    return {
      count: 100
    }
  },
  actions: {
    increment() {
      this.count++
    },
    decrement() {
      this.count--
    }
  }
})
```

在 server 中，创建 pinia 并安装：

demo-project\02-vue3-ssr\src\server\index.js

```js
import { createPinia } from 'pinia';
//...

server.get('/*', async (req, res, next) => {
  // 创建 app
  const app = createApp()

  // 创建 pinia
  const pinia = createPinia()
  app.use(pinia)
}
```

在 client 中，创建 pinia 并安装：

demo-project\02-vue3-ssr\src\client\index.js

```js
//...
import { createPinia } from 'pinia';

// 创建 app
const app = createApp(App)

// 创建 pinia
const pinia = createPinia()
app.use(pinia)

```

在 Home.vue 中，读取变量；

demo-project\02-vue3-ssr\src\views\Home.vue

```vue
<script setup>
import { storeToRefs } from 'pinia';
import { useHomeStore  } from '../store/home';

const homeStore = useHomeStore()

const { count } = storeToRefs(homeStore)

function onAddButtonClick() {
  count.value++
}
</script>

<template>
  <div class="home" style="border: 1px solid green; margin: 10px">
    <h1>Home</h1>
    <div>{{ count }}</div>
    <button @click="onAddButtonClick">加1</button>
  </div>
</template>

<style scoped></style>
```

同样的，在 App.vue 和 About.vue 中 引入 pinia 中的状态 count。

demo-project\02-vue3-ssr\src\views\About.vue

```js
<script setup>
import { storeToRefs } from 'pinia';
import { useHomeStore  } from '../store/home';

const homeStore = useHomeStore()

const { count } = storeToRefs(homeStore)

function onAddButtonClick() {
  count.value++
}
</script>

<template>
  <div class="about" style="border: 1px solid blue; margin: 10px">
    <h1>About</h1>
    <div>{{ count }}</div>
    <button @click="onAddButtonClick">加1</button>
  </div>
</template>

<style scoped></style>
```

---

nuxt

什么是 Nuxt



Nuxt 的发展史。



Nuxt 有何特点？



Nuxt.js 与 Nuxt3 有何不同？

---

Nuxt3 环境搭建。

创建项目报错处理。

---

Nuxt3 项目目录结构。



package.json 中，脚本的含义：

demo-project\03-hello-nuxt\package.json

```json
{
  "scripts": {
    "build": "nuxt build", // 打包正式版本：使用 nitro 引擎，将项目打包到 .output 中
    "dev": "nuxt dev", // 开发环境运行。
    "generate": "nuxt generate", // 打包正式版本项目，但是会提前预渲染每个路由，相当于 nuxt build --rerander
    "preview": "nuxt preview", // 打包项目（build / generate）后，进行本地预览。
    "postinstall": "nuxt prepare" // npm 生命周期钩子， 当执行完 npm install 后，自动执行，生成 .nuxt 目录，里面有 ts 的类型。
  },
}
```

---

应用入口分析

---

Nuxt 配置

nuxt.config.ts 文件配置。

配置 runtimeConfig 运行时配置；

在 app.vue 中，访问该配置。

- app.vue 会在客户端和服务端各打包一份。
- 所以在其中编写代码，要判断环境。
- 还可以通过 `if (typeof window === 'object')`

---

.env 文件配置

在项目根目录，创建 .env 文件，

该配置文件中的配置，不会区分是开发环境还是生产环境：

在这里写的变量，都会放到 `process.env` 对象中。

```env
NUXT_APP_KEY = 'DDDDD' # 会覆盖 nuxt.config.ts 中的 runtimeConfig 中的 appKey
```

会通过 dotenv 包，读取其中的环境变量

配置

```env
PORT=9000
```

项目会运行在 9000 端口上。