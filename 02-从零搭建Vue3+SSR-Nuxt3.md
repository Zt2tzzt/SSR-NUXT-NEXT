# 从零搭建Vue3+SSR & Nuxt3

## 一、邂逅 Vue3 + SSR

### 1.hydration

在 client/index.js 中，编写代码：

demo-project\02-vue3-ssr\src\client\index.js

```js
import { createApp } from 'vue';
import App from '../App.vue';

const app = createApp(App)
app.mount('#app')
```

创建 `webpack.client.config.js` 文件，在其中进行客户端的配置.

消除警告，使用 webpack 提供的 `DefinePlugin` 插件，配置全局环境变量。

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
  // externals: [nodeExternals()] 不需要该配置，现在打包的是客户端的 web 应用程序。
}
```

在 `package.json` 中，进行配置。

demo-project\02-vue3-ssr\package.json

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

打包服务端代码。

在 `src\server\index.js` 中，引入打包好的 `client_bundle.js` 文件。

同时，要使用 express 的静态资源部署功能；

demo-project\02-vue3-ssr\src\server\index.js

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

### 2.跨请求状态的污染

在 SPA 中，整个生命周期中只有一个 app 对象实例、一个 router 对象实例、一个 store 对象实例；

用户在使用浏览器，访问 SPA 应用时，应用模块都会重新初始化，这是一种单例模式。

然而，在 SSR 模式下，app 应用模块，通常只在服务器启动时，初始化一次；

同一个应用模块，会在多个请求里被复用，单例状态的对象也一样，也会在多个请求之间被复用，比如：

- 当某个用户，对共享的单例状态进行修改，那么这个状态可能会意外地泄露给另一个在请求的用户。
- 这种情况称为：**跨请求状态污染**。

为了避免“跨请求状态污染”，SSR 的解决方案是：

- 在每个请求中，为整个应用创建一个全新的实例，包括 router 和全局 store 等实例。
- 所以在创建 app、router、store 对象时，都会使用一个函数来创建，保证每个请求，都会创建一个全新的实例。

这样也会有**缺点**：需要消耗更多的服务器的资源：

这也解释了，为什么 app.js 中，要导出一个函数？

demo-project\02-vue3-ssr\src\app.js

```js
import { createSSRApp } from 'vue';
import App from './App.vue';

// 导出一个函数，在其中中返回 app 实例。
// 避免跨请求状态的污染。
// 保证每个请求，都会返回一个新的 app 实例。
export default function createApp() {
  const app = createSSRApp(App)
  return app
}
```

### 3.配置文件抽取

安装 *webpack-merge* 插件。

```shell
pnpm add webpack-merge -D
```

抽取 `webpack.server.config.js` 和 `webpack.client.config.js` 中的公共部分，到 `webpack.base.config.js` 中。

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

### 4.Vue Router 配置

安装 *vue-router*：

```shell
pnpm add vue-router
```

创建 views 文件夹。

在其中，创建 `Home.vue`、`About.vue` 文件。

demo-project\02-vue3-ssr\src\views\Home.vue

demo-project\02-vue3-ssr\src\views\About.vue

创建 router 文件夹。

在其中初始化 vue router，同样的，为了防止“跨请求状态的污染”，导出一个函数。

- 在服务器、客户端渲染两种情况下，路由模式是不确定的，需要传入到这个函数中

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

在 `App.vue` 中，编写路由的导航和占位。

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

在 `server/index.js` 中，创建 router，传入路由模式：

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
  await router.push(req.url || '/') // 路由加载的是异步组件，返回的是 promise。
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

再 `client/index.js` 中，进行相同的操作：

demo-project\02-vue3-ssr\src\client\index.js

```js
import { createApp } from 'vue';
import App from '../App.vue';
import createRouter from '../router';
import { createWebHistory } from 'vue-router';

// 创建 app
const app = createApp(App)

// 创建 router
const router = createRouter(createWebHistory())

// 安装 router
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

### 5.Pinia 配置

安装 *pinia*：

```shell
pnpm add pinia
```

同样的，在服务端、客户端，都要创建 pinia 对象。

服务端的 pinia，会把状态转成字符串的形式，存放在 window 对象上；

在 hydration 时，注入到客户端 window 对象上，以便使用。

创建 store 文件夹，创建 `homeStore`

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

在 `server/index.js` 中，创建 pinia 并安装：

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

在 `client/index.js` 中，创建 pinia 并安装：

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

在 `Home.vue` 中，读取变量；

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

同样的，在 `App.vue`、`Home.vue`、`About.vue` 中 引入 pinia 中的状态 `count`。

demo-project\02-vue3-ssr\src\views\About.vue

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
  <div class="about" style="border: 1px solid blue; margin: 10px">
    <h1>About</h1>
    <div>{{ count }}</div>
    <button @click="onAddButtonClick">加1</button>
  </div>
</template>

<style scoped></style>
```

执行命令：

```shell
pnpm build:server
pnpm build:client
pnpm start
```

至此，Vue3 配置 SSR 完成。

## 二、Nuxt 是什么？

在了解 Nuxt 之前，思考创建一个现代应用程序，所需的技术：

- 支持数据双向绑定和组件化（Nuxt 选择了 Vue.js）。
- 支持前端路由（Nuxt 选择了 vue-router）。
- 支持 HMR 和生产环境代码打包（Nuxt 支持 webpack5 和 Vite）。
- 支持 JS 语法转换，兼容旧版浏览器（Nuxt 使用 esbuild）。
- 支持开发环境服务器，也支持服务器端渲染，或 API 接口开发。

Nuxt 使用 h3，来实现部署可移植性；

- h3 是一个极小的高性能的 http 框架 
- 比如：支持在 Serverless、Workers 和 Node.js 环境中运行。

> Serverless：表示“无服务”。
>
> - 无需自己做过多配置，开箱即用的服务器；
> - 小程序的云函数，就属于 Serverless 的概念。
> - 腾讯云、Netify、Vercel 等平台，提供了这种服务器；
>
> workers：表示“节点”的概念：
>
> - 如 CDN，国外有 CloudFlare 平台；
> - 是 Serverless 概念中的一种。

Nuxt 是一个直观的 Web 框架：

- 自 2016 年 10 月以来，Nuxt 专门负责集成上述所描述的事情，并提供前端和后端的功能。
- Nuxt 框架，可以用来快速构建下一个 Vue.js 应用程序；
- 支持 CSR、SSR、SSG 混合渲染模式等模式的应用。





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