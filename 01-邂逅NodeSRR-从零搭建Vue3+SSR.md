主要学习：

1.认识 SSR、SPA、SSG、ISR、CSR、SEO 等概念。理解爬虫的工作流程。

2.从零开始搭建 Vue3 + SSR；认识 Hydration（水合）。

3，Nuxt3 Vue3 => SSR 基础、核心语法，项目实战，集群（cluster）部署

4.从零开始搭建 React + SSR；

3，Nextjs React18 => SSR 基础、核心语法，项目实战，集群（cluster）部署

---

单页面富应用（SPA）是什么？

理解 SPA 图解。

理解客户端渲染（CRS，client side rander）原理图解。

---

SPA 的优点和缺点

不利于 SEO 是致命的。

---

爬虫工作流程。

理解图解。

---

搜索引擎优化（SEO）细节。

理解表格，作为参考。

---

哪些页面是利于 SEO 的？

静态站点生成（SSG，static site generator）是什么？

SSG 的优点和缺点。



适用场景：

例如说明文档，博客...这样的静态站点。

---

服务器端渲染（SSR，Server side render）是什么。

理解 Vue3 + SSR 生成静态文件的图解。

理解 Vue3 + SSR hydration 的图解。



SSR 的优点和缺点。

---

SSR 解决方案。

三种方案：



应用场景

---

邂逅 Vue3 + SSR

创建 01-... 项目；

初始化项目：

```shell
pnpm init
```

---

Node Server 的搭建。

安装依赖 express、

```shell
pnpm add express
```

安装开发时依赖 nodemon、webpack、webpack-node-externals

```shell
pnpm add webpack webpack-cli webpack-node-externals nodemon -D
```

创建 exoress 服务器。

01-node-server\src\server\index.js

```js
const express = require('express')

const app = express()

app.get('/home', (req, res, next) => {
  res.send(`Hello Node Server`)
})

app.listen(9000, () => {
  console.log('start node server on port 9000 ~')
})
```

配置启动服务的脚本：

01-node-server\package.json

```json
{
  "scripts": {
    "start": "nodemon ./src/server/index.js"
  },
}
```

编写 webpack 配置文件，对服务进行打包

01-node-server\src\config\webpack.config.js

```js
const path = require('path')

module.exports = {
  target: 'node',
  mode: 'development',
  entry: './src/server/index.js', // 相对于项目运行的目录。
  output: {
    filename: 'server_bundle.js',
    path: path.resolve(__dirname, '../build/server')
  }
}
```

在 webpack 配置文件中，配置打包服务端代码的命令。

```json
{
  "scripts": {
    "dev": "nodemon ./src/server/index.js",
    "build:server": "webpack --config ./config/webpack.config.js --watch" // 项目文件改变后，重新打包
  },
}
```

执行命令，打包

```shell
pnpm build:server
```

发现打包的结果太大；

因为打包的是 node 环境，所以要配置 webpack，排除 webpack-node-externals 的打包。

01-node-server\src\config\webpack.config.js

```js
const path = require('path')
const nodeExternals = require('webpack-node-externals')

module.exports = {
  target: 'node',
  mode: 'development',
  entry: './src/server/index.js', // 相对于项目运行的目录。
  output: {
    filename: 'server_bundle.js',
    path: path.resolve(__dirname, '../build/server')
  },
  externals: [nodeExternals()]
}
```

配置命令 start，用于运行打包后的服务端代码。

```json
{
  "scripts": {
    "dev": "nodemon ./src/server/index.js",
    "start": "nodemon ./build/server/server_bundle.js",
    "build:server": "webpack --config ./config/webpack.config.js --watch"
  },
}
```

---

Vue App 搭建

将 App.vue 转成字符串，放入到 Node Server 中。

拷贝 01-... 项目，重命名为 02-... 项目。

在其中还要安装依赖：vue

```shell
pnpm add vue
```

安装开发时依赖 vue-loader、babel-loader、@babel/preset-env、webpack-merge

```shell
pnpm add vue-loader babel-loader @babel/core @babel/preset-env webpack-merge -D
```

编写一个 `App.vue` 文件。

02-vue3-ssr\src\App.vue

```vue
<script setup>
import { ref } from 'vue';

const count = ref(100)
const onAddButtonClick = () => count.value++

</script>

<template>
  <div class="app" style="border: 1px solid red;">
    <h1>Vue3 app</h1>
    <div>{{ count }}</div>
    <button @click="onAddButtonClick">+1</button>
  </div>
</template>

<style scoped>
</style>
```

创建 Vue3 的入口，

02-vue3-ssr\src\app.js

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

在 webpack 配置文件中，配置扩展名：

02-vue3-ssr\config\webpack.config.js

```js
const path = require('path')
const nodeExternals = require('webpack-node-externals')

module.exports = {
  target: 'node',
  mode: 'development',
  entry: './src/server/index.js', // 相对于项目运行的目录。
  output: {
    filename: 'server_bundle.js',
    path: path.resolve(__dirname, '../build/server')
  },
  resolve: {
    extenstions: ['.js', '.json', 'wasm', '.jsx', '.vue']
  },
  externals: [nodeExternals()]
}
```

在 Node Server 的入口文件中，引入 app 实例。

将 app 实例，转成字符串。

02-vue3-ssr\src\server\index.js

```js
const express = require('express')
import createApp from '../app';
import { renderToString } from 'vue/server-renderer';

const server = express()

server.get('/', async (req, res, next) => {
  const app = createApp()
  const appHtmlString = await renderToString(app)

  res.send(`<!DOCTYPE html>
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
  </body>
  </html>`)
})

server.listen(9000, () => {
  console.log('start node server on port 9000 ~')
})
```

在 webpack 配置文件中，配置 loader

修改 `webpack.config.js` 名称为 `webpack.server.config.js`；

02-vue3-ssr\config\webpack.server.config.js

```js
const path = require('path')
const nodeExternals = require('webpack-node-externals')
const { VueLoaderPlugin } = require('vue-loader/dist/index')

module.exports = {
  target: 'node',
  mode: 'development',
  entry: './src/server/index.js', // 相对于项目运行的目录。
  output: {
    filename: 'server_bundle.js',
    path: path.resolve(__dirname, '../build/server')
  },
  resolve: {
    extensions: [".js", ".json", ".wasm", ".jsx", ".vue"],
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
  plugins: [new VueLoaderPlugin()],
  externals: [nodeExternals()]
}
```

执行命令打包

```shell
pnpm build:server
```

执行命令，开启本地服务

```shell
pnpm start
```

访问 localhost:9000

静态资源被展示，但不能点击按钮交互。

至此，同构应用的服务端搭建，已经完成

接下来要进行 hydration。也就是搭建客户端，新建 client 文件夹。