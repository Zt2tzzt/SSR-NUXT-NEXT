# 邂逅NodeSRR & 从零搭建Vue3+SSR

## 一、学习阶段

1.认识 SPA、CSR、SSG、SSR、ISR、SEO 等概念。理解爬虫的工作流程。

2.从零开始搭建 Vue3 + SSR；认识 Hydration（水合）。

3.Nuxt3 Vue3 => SSR：

- 基础语法；
- 核心语法，
- 项目实战；
- 集群（cluster）部署

4.从零开始搭建 React + SSR；

5.Nextjs React18 => SSR：

- 基础语法；
- 核心语法；
- 项目实战；
- 集群（cluster）部署

## 二、单页面富应用（SPA）

单页面富应用程序 (SPA) 全称是：Single-page application；

SPA 应用，是在**客户渲染的（CSR，client side render）**。

SPA 应用，默认只返回一个空 HTML 页面；

- 如：`<body>` 中，只有  `<div id="app"></div>`。

整个应用程序的内容，要通过 JS 动态加载，包括：

- 应用程序的逻辑；
- UI 界面；
- 与服务器通信相关的所有数据。

构建 SPA 应用，常见的库和框架有：

- React；
- AngularJS；
- Vue.js。
- ...

单页面富应用（SPA）原理图解：

![单页面应用程序渲染原理](NodeAssets/单页面应用程序渲染原理.png)

**客户端渲染（CSR，client side rander）**原理图解：

![客户端渲染原理](NodeAssets/客户端渲染原理.jpg)

### 1.SPA 优点

只需加载一次；

- SPA 应用程序，只需要在第一次请求时，加载页面；页面切换不需重新加载；因此，SPA 页面加载速度要比传统 Web 应用程序更快
- 而传统的 Web 应用程序，必须在每次请求时都得加载页面，需要花费更多时间。

更好的用户体验；

- SPA 提供类似于桌面或移动应用程序的体验。用户切换页面不必重新加载新页面；
- 切换页面只是内容发生了变化，页面并没有重新加载，从而使体验变得更加流畅

可轻松的构建功能丰富的 Web 应用程序

### 2.SPA 缺点

SPA 应用，默认只返回一个空 HTML 页面，不利于 **SEO（search engine optimization)**；这是**致命的缺点**。

首屏加载的资源过大时，也会影响首屏的渲染；

不利于构建复杂的项目，复杂 Web 应用程序的大文件可能变得难以维护；

## 三、爬虫工作流程

爬虫（也称蜘蛛），从互联网上发现各类网页，网页中的外部连接也会被发现。

举例：Google 爬虫的工作流程分为 3 个阶段，并非每个网页都会经历这 3 个阶段：

阶段一：抓取：

- 抓取数以十亿被发现网页的内容，如：文本、图片、视频...

阶段二：索引编制：

- 爬虫程序，会分析网页上的文本、图片和视频文件；
- 并将信息存储在大型数据库（索引区）中。
- 例如 `<title>` 元素和 `alt` 属性、图片、视频...；
- 爬虫会对内容类似的网页归类分组。
- 不符合规则内容的网站，会被清理。
  - 如：禁止访问或需要权限访问的网站。

阶段三：呈现搜索结果：

- 当用户在 Google 中搜索时，搜索引擎会根据内容的类型，选择一组网页中最具代表性的网页进行呈现。

![爬虫的工作流程](NodeAssets/爬虫的工作流程.jpg)

## 四、搜索引擎优化（SEO）

要怎样进行搜索引擎优化（SEO，search engine optimization）?

1.多使用语义性 HTML 标记：

- 标题用 `<h1>`，一个页面只有一个；副标题用 `<h2>` 到 `<h6>`。
  - 不要过度使用 h 标签，多次使用不会增加 SEO。
- 段落用 `<p>`；
- 列表用 `<ul>`，并且 `<li>` 只放在 `<ul>` 中。
- ...

2.每个页面需包含：标题 + 内部链接

- 每个页面对应的 `<title>`，同一网站，所有页面，都有内链可以指向首页。

3.确保链接可供抓取，如下所示：

- ✔ `<a href="https://example.com">`
- ✔ `<a href="/relative/path/file">`
- ❌ `<a routerLink="some/path">`
- ❌ `<span href="http://example.com>"`
- ❌ `<a onclick="global('http://example.com')">`

4.`<meta>` 标签优化：设置 description keywords 等

5.多用“文本标记”和 `<img>`，比如：

- `<b>` 和 `<strong>` 加粗文本的标签，爬虫也会关注到该内容。
- `<img>` 标签添加 `alt` 属性，图片加载失败，爬虫会取 `alt` 内容。

6.`robots.txt` 文件：规定爬虫可访问网站上的哪些网址。

7.`sitemap.xml` 站点地图：列出所有网页，确保爬虫不会漏掉某些网页。

更多 SEO 优化注意事项，查看：[Google文档](https://developers.google.com/search/docs/crawling-indexing/valid-page-metadata)。

理解 SEO 评分规则表格，作为参考。

| HTML 标签               | 含义                                                   | SEO 权重 |
| ----------------------- | ------------------------------------------------------ | -------- |
| `<title>`               | 标题                                                   | 10 分    |
| `<a>`                   | 内部链接文字                                           | 10 分    |
| `<h1>`/`<h2>`           | 标题，其实是 h1-h6，其中 `<h1>` 和 `<h2>` 是最重要的； | 5 分     |
| `<p>`                   | 每段首句                                               | 5 分     |
| `<p>`                   | 每句开头                                               | 1.5 分   |
| `<b>`/`<string>`        | 加粗                                                   | 1 分     |
| `<a title=''>`          | title 属性                                             | 1 分     |
| `<img alt=''>`          | img alt 标记                                           | 0.5 分   |
| `<meta description=''>` | meta 标签的网站 description                            | 0.5 分   |
| `<meta keywords=''>`    | meta 标签的网站 keywords                               | 0.05 分  |

哪些页面是利于 SEO 的呢？

## 五、静态站点生成（SSG）

**静态站点生成（SSG，Static Site Generate）**，指的是预先生成好的静态网站。

SSG 应用一般在构建阶段，就确定了网站的内容。

如果网站的内容需要更新了，那必须重新构建和部署。

构建 SSG 应用，常见的库和框架有：

- Vue Nuxt；
- React Next.js。

适用场景：说明文档，博客...，这样的静态站点。

### 1.SSG 优点

访问速度快，因为每个页面，在构建阶段就已经生成好了；通常有比 SSR 更好的性能。

有利于 SEO，因为直接给浏览器返回静态的 HTML 文件；

保留了 SPA 应用的特性；

- 比如：前端路由、响应式数据、虚拟 DOM 等。

### 2.SSG 缺点

不利于展示实时性的内容（SSR 更合适），页面都是静态的。

如果站点内容更新了，那必须得重新再次构建和部署。

## 六、服务器端渲染（SSR）

**服务器端渲染（SSR,Server Side Render）**，指的是：在服务器端渲染页面，并将渲染好 HTML 返回给浏览器呈现。

SSR 应用的页面，是在服务端渲染的；

用户每请求一个 SSR 页面，都会先在服务端进行渲染，服务端再将渲染好的页面，返回给浏览器呈现。

构建 SSR 应用，常见的库和框架有：

- Vue Nuxt；
- React Next.js

SSR 应用，也称同构应用。

- “服务端打包的应用程序”和“客户端打包的应用程序”同时构建的应用。

- “server.bundle.js” 和 “client.bundle.js” 同时构建的应用程序。

理解 Vue3 + SSR 生成静态文件的图解。

![Vue3 + SSR 生成静态文件](NodeAssets/Vue3+SSR生成静态文件.png)

理解 Vue3 + SSR hydration 的图解。

![Vue3 + SSR hydration](NodeAssets/Vue3+SSR-hydration.png)

服务器端渲染原理:

![服务器端渲染原理](NodeAssets/服务器端渲染原理.jpg)

### 1.SSR 优点

更快的首屏渲染速度：

- 浏览器显示静态页面内容，要比加载 JS 后，动态生成的内容快得多。
- 当用户访问首页时，可立即返回静态页面内容，而不需要等待浏览器先加载完整个应用程序。

更好的 SEO

- 爬虫可直接爬取服务器端返回的静态 HTML 页面；
- 有利于爬虫快速抓取网页内容，并编入索引；

SSR 应用程序，在 Hydration 后，依然可以保留 Web 应用程序的交互性。

- 比如：前端路由、响应式数据、虚拟 DOM 等。

### 2.SSR 缺点

SSR 通常需要对服务器进行更多 API 调用，会消耗更多的服务器资源，成本高。

增加增加开发者心智负担，开发者要关心：哪些代码运行在服务器端，哪些代码运行在浏览器端；

SSR 配置站点的缓存，通常会比 SPA 站点要复杂一点。

## 七、SSR 解决方案

方案一：php、jsp ...

方案二：从零搭建 SSR 项目（Node + webpack + Vue / React）；

方案三：使用流行的框架（推荐）：

- React + Next.js
- Vue3 + Nuxt3 / Vue2 + Nuxt.js
- Angular + Anglular Universal

## 八、SSR 应用场景

SaaS 产品，如：

- 电子邮件网站；
- 在线游戏；
- 客户关系管理系统（CRM）；
- 采购系统
- ...

门户网站，如：

- 电子商务；
- 零售网站。

单个页面，如：

- 静态网站；
- 文档类网站；

...

案例：稀土掘金、魅族、美团、TikTok、awwwards、monopo...

## 九、邂逅 Vue3 + SSR

创建 01-node-server 项目；

初始化项目：

```shell
pnpm init
```

### 1.Node Server 搭建

安装依赖 *express*、

```shell
pnpm add express
```

安装开发时依赖 *nodemon*、*webpack*、*webpack-node-externals*；

- webpack-node-externals：用于排除掉 node_modules 中所以的模块

```shell
pnpm add webpack webpack-cli webpack-node-externals nodemon -D
```

创建 exoress 服务器。

demo-project\01-node-server\src\server\index.js

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

在 `package.json` 中，配置启动服务的脚本：

demo-project\01-node-server\package.json

```json
{
  "scripts": {
    "start": "nodemon ./src/server/index.js"
  },
}
```

编写 `webpack.config.js` 配置文件，对服务端代码，进行打包。

demo-project\01-node-server\src\config\webpack.config.js

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

在 `package.json` 中，配置打包服务端代码的命令。

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

因为打包的是 node 环境（`target: "node"`）；

所以要在 `webpack.config.js` 中，配置 webpack-node-externals，排除 node 环境的打包。

demo-project\01-node-server\src\config\webpack.config.js

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

在 `package.json` 中，配置命令 “start”，用于运行打包后的服务端代码。

```json
{
  "scripts": {
    "dev": "nodemon ./src/server/index.js",
    "start": "nodemon ./build/server/server_bundle.js",
    "build:server": "webpack --config ./config/webpack.config.js --watch"
  },
}
```

### 2.Vue3 App 搭建

主要目的是：将 vue3 代码（App.vue）转成字符串，放入到 Node Server 中，并返回给客户端。

拷贝 01-node-server 项目，重命名为 02-vue3-ssr 项目。

安装依赖：*vue*

```shell
pnpm add vue
```

安装开发时依赖 *vue-loader*、*babel-loader*、*@babel/preset-env*、*webpack-merge*

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

创建 Vue3 App 的入口，

02-vue3-ssr\src\app.js

```js
import { createSSRApp } from 'vue';
import App from './App.vue';

// 导出一个函数，在其中返回 app 实例。这么做的原因是：
// - 避免跨请求状态的污染。
// - 保证每个请求，都会返回一个新的 app 实例。
export default function createApp() {
  const app = createSSRApp(App)
  return app
}
```

在 `webpack.config.js` 配置文件中，配置扩展名：

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

在 `webpack.config.js` 配置文件中，

- 配置 loader；
- 配置 `VueLoaderPlugin`

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

执行命令打包：

```shell
pnpm build:server
```

执行命令，开启本地服务：

```shell
pnpm start
```

访问 `localhost:9000`：

静态资源被展示，但不能点击按钮交互。

至此，同构应用的服务端搭建，已经完成；

接下来要进行 hydration。也就是搭建客户端，新建 client 文件夹。
