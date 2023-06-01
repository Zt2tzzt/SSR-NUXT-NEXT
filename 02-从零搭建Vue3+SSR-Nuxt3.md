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

