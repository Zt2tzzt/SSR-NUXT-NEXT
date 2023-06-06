# 从零搭建Vue3+SSR & Nuxt3

## 一、邂逅 Vue3 + SSR

### 1.hydration

在 `client/index.js` 中，编写代码：

demo-project\02-vue3-ssr\src\client\index.js

```js
import { createApp } from 'vue';
import App from '../App.vue';

const app = createApp(App)
app.mount('#app')
```

创建 `webpack.client.config.js` 文件，在其中进行客户端的配置.

运行时项目，消除浏览器中的警告：

使用 webpack 提供的 `DefinePlugin` 插件，配置全局环境变量。

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
```

生成客户端打包文件，

demo-project\02-vue3-ssr\build\client\client_bundle.js

---

打包服务端代码。

在 `src\server\index.js` 中，引入打包好的 `client_bundle.js` 文件。

同时，使用 express 服务器的静态资源部署功能；

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

执行命令：

```shell
pnpm build:server
```

生成服务端打包文件，

demo-project\02-vue3-ssr\build\server\server_bundle.js

### 2.跨请求状态的污染

在 SPA 中，整个生命周期中只有一个实例：

- 比如：一个 app 对象实例、一个 router 对象实例、一个 store 对象实例；
- 用户在使用浏览器，访问 SPA 应用时，应用模块，都会重新初始化，这是一种**单例模式**。

然而，在 SSR 模式下，app 应用模块，通常只在服务器启动时，初始化一次；

同一个应用模块，会在多个请求里被复用；

单例状态的对象也一样，也会在多个请求之间被复用，比如：

- 当某个用户，对共享的单例状态，进行修改，那么这个状态可能会意外地泄露给另一个在请求的用户。

这种情况称为：**跨请求状态污染**。

为了避免“跨请求状态污染”，SSR 的解决方案是：

- 在每个请求中，为整个应用创建一个全新的实例，比如全新的 app、router、store 实例。
- 所以在创建 app、router、store 对象时，都会使用一个函数来创建，保证每个请求，都会创建一个全新的实例。

这样也会有**缺点**：需要消耗更多的服务器的资源：

这也解释了，为什么 `app.js` 中，要导出一个函数？

demo-project\02-vue3-ssr\src\app.js

```js
import { createSSRApp } from 'vue';
import App from './App.vue';

// 导出一个函数，在其中中返回 app 实例。
// 避免“跨请求状态的污染”。
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

在 `server/index.js` 中，创建 router，传入路由模式 `createMemoryHistory`：

路由加载完成后，再渲染页面：

无论请求怎样的路径，都会来到这个服务里，所以更改请求路径为 `/*`；

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

在 `client/index.js` 中，进行相同的操作：

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

服务端的 pinia，会把状态转成字符串的形式，存放在 `window` 对象上；

在 hydration 时，注入到客户端 `window` 对象上，以便使用。

创建 store 文件夹，创建 `homeStore`；

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

同样的，在 `App.vue`、`Home.vue`、`About.vue` 中：

引入 pinia 中的状态 `count`。

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

- h3 是一个极小的，高性能的 http 框架。
- 比如：支持在 Serverless、Workers、Node.js 环境中运行。

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

- 自 2016 年 10 月以来，Nuxt 专门负责集成上述功能，提供前后端的功能。
- Nuxt 框架，可用来快速构建下一个 Vue.js 应用程序；
- 支持 CSR、SSR、SSG 混合渲染模式等，模式的应用。

## 三、Nuxt 的发展史

2016.10.25，Nuxt.js 诞生，由 Sebastien Chopin 创建；

- 基于 Vue2 、Webpack2 、Node、Express。

2018.1.9，Sebastien Chopin 发布 Nuxt.js 1.0 版本。

- 放弃了对 node < 8 的支持

2018.9.21，Sebastien Chopin 发布 Nuxt.js 2.0 版本。

- 开始使用 Webpack 4， 其它并无重大更改。

2021.8.12，发布 Nuxt.js 2.15.8 版本。

2021.10.12，经过 16 个月的工作，Nuxt 3 beta 发布；

- 引入了基于 Vue 3、Vite、Nitro（服务引擎） 。

2022.4.20，六个月后，Pooya Parsa 宣布 Nuxt 3 的第一个候选版本，代号为“Mount Hope”

2022.11.16，Pooya Parsa 宣布 Nuxt3 发布为第一个正式稳定版本。

[Nuxt3 官网地址](https://nuxt.com/)

## 四、Nuxt3 特点

Vue 技术栈：

- Nuxt3 是基于 Vue3 + Vue Router + Vite 等技术栈，
- 拥有 Vue3 + Vite 开发体验（Fast）。

自动导包：

- 自动导入辅助函数、Composition API、Vue API；
- 自动导入基于规范的目录结构，提供对自己的组件、插件使用自动导入。

约定式路由（目录结构即路由）：

- 基于 vue-router；在 `pages` 目录中，创建的每个页面，会根据目录结构和文件名，自动生成路由。

多种渲染模式（SSR、CSR、SSG，混合渲染模式等）:

利于搜索引擎优化（SEO）：

- 服务器端渲染模式，不但可以提高首屏渲染速度，还利于 SEO；

服务器引擎：

- 在开发环境中，它基于 Node.js，使用 Rollup 服务和打包 。
- 在生产环境中，使用 Nitro，将应用程序和服务器，构建到一个通用 `.output` 目录中。

> Nitro 服务引擎，提供了跨平台部署的支持；
>
> - 包括 Node、Deno、Serverless、Workers 等平台上部署。

## 五、Nuxt3 创建项目

环境准备：

- Node.js（最新 LTS 版本，或 16.11 以上）
- VSCode 插件：Volar、ESLint、Prettier

命令行工具，创建项目（hello-nuxt)

```shell
npx nuxi init hello-nuxt

pnpm dlx nuxi init hello-nuxt # 推荐

npm install –g nuxi && nuxi init hello-nuxt
```

### 1.报错处理

创建项目时，可能会报错，主要是网络不通导致：

解决步骤：

1.执行 ping 命令，检查下面的域名，是否能连通；

```shell
ping raw.githubusercontent.com
```

2.如果访问不通，代表是网络不通。

3.配置 host，本地解析域名

- Mac 电脑 host 配置路径：`/etc/hosts`
- Win 电脑 host 配置路由：`c:/Windows/System32/drivers/etc/hosts`

4.在 host 文件中新增一行 ，编写如下配置：

```txt
185.199.108.133 raw.githubusercontent.com
```

5.重新 ping 域名，检查是否连通。

创建项目成功后，安装依赖：

```shell
yarn install

pnpm install --shamefully-hoist # 创建一个扁平的 node_modules 目录结构，类似 npm 和 yarn

yarn dev
```

## 六、Nuxt3 项目目录结构

Nuxt3 通常使用的目录如下：

```shell
assets # 资源目录
components # 组件目录
composables # 组合 API 目录
layout # 布局目录
pages # 定义页面文件夹，路由会根据该目录结构，和文件名自动生成
  index.vue # 项目的首页
plugins # 插件目录
public # 静态资源目录，不参与打包
app.vue # 整个应用程序
app.config.ts # 应用程序的配置
nuxt.config.js # 可定制 Nuxt 框架的配置，比如 css ssr vite app modules 等等
package.lock.json
package.json
README.md
tsconfig.json # typescript 的配置文件
```

`package.json` 中，脚本的含义：

demo-project\03-hello-nuxt\package.json

```json
{
  "scripts": {
    "build": "nuxt build", // 打包正式版本：会使用 nitro 引擎，将项目打包到 .output 中
    "dev": "nuxt dev", // 开发环境运行项目。
    "generate": "nuxt generate", // 打包正式版本项目，但是会提前预渲染每个路由，相当于 nuxt build --rerander
    "preview": "nuxt preview", // 打包项目（build / generate）后，进行本地预览。
    "postinstall": "nuxt prepare" // npm 生命周期钩子，当执行完 npm install 后，自动执行，生成 .nuxt 目录，里面有 ts 的类型。
  },
}
```

## 七、应用入口分析

默认情况下，Nuxt 会将 `app.vue` 文件，视为项目入口；并为应用程序的每个路由呈现其内容，

该文件常用于：

- 定义页面布局 Layout，或自定义布局，如：`<NuxtLayout>`（一个内置组件）
- 定义路由的占位，如：`<NuxtPage>`；
- 编写全局样式；
- 全局监听路由。
- ...

## 八、nuxt.config.js

`nuxt.config.ts` 用于对 Nuxt 进行自定义配置。有如下配置：

### 1.runtimeConfig

`runtimeConfig`：**运行时配置**（运行的时候，才会去读取的配置），即定义环境变量。

详见[官方文档1](https://nuxt.com/docs/api/configuration/nuxt-config#runtimeconfig)、[官方文档2](https://nuxt.com/docs/getting-started/configuration#environment-variables-and-private-tokens)

demo-project\03-hello-nuxt\nuxt.config.ts

```js
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    // 配置属性采用驼峰的形式
    // server 端可访问的配置，会被打包到 server_bundle.js 中
    appKey: 'aabbcc',

    // server、client 端，可访问的配置。会被打包到 server_bundle.js 和 client_bundle.js 中。
    public: {
      baseURL: 'http://codercba.com'
    }
  }
})
```

通过 `.env` 文件中的环境变量，来覆盖，优先级（`.env` > `runtimeConfig`）

- `.env` 的变量，会注入到 `process.env` 中，其中符合规则的变量，会覆盖 `runtimeConfig` 的变量.
- `.env` 一般用于：某些终端启动应用时，动态指定配置，同时支持 dev 和 pro 环境。

在项目根目录，创建 `.env` 文件，

项目运行时，会通过 *dotenv* 库，读取其中的环境变量，配置：

在这里写的变量，都会放到 `process.env` 对象中。

```shell
NUXT_APP_KEY = 'DDDDD' # 会覆盖 nuxt.config.ts 中的 runtimeConfig 中的 appKey

PORT= 9000 # 项目会运行在 9000 端口上。
```

`app.vue` 中，可访问到 `runtimeConfig` 配置。

`app.vue` 会在客户端和服务端各打包一份。所以在其中编写代码，要判断环境。

demo-project\03-hello-nuxt\app.vue

```vue
<script setup>
// 1.获取运行时配置（server and client）
const runtimeConfig = useRuntimeConfig()

// 判断环境，方式一
if (process.server) {
  console.log('运行在 server~')
  console.log('runtimeConig.appKey:', runtimeConfig.appKey)
  console.log('runtimeConig.public.baseURL:', runtimeConfig.public.baseURL)
}
if (process.client) {
  console.log('运行在 client~')
  console.log('runtimeConig.public.baseURL:', runtimeConfig.public.baseURL)
}

// 判断环境，方式二
if (typeof window === 'object') {
  console.log('运行在 client~')
}

</script>

<template>
  <div>
    Hello Nuxt3
    <!-- next/ui 组件库的组件 -->
    <!-- <NuxtWelcome /> -->
  </div>
</template>
```
