邂逅 React18 + SSR

Node Server 搭建

React18 + SSR 搭建

依赖安装

创建 src/server/index.js，在其中创建 express 服务。

src\server\index.js

```js
const express = require('express')

const app = express()

app.get('/', (req, res, next) => {
  res.send('hello express')
})

app.listen(9000, () => {
  console.log('express 服务器启动成功了')
})
```

配置启动服务的脚本：

package.json

```json
{
  "scripts": {
    "dev": "nodemon ./src/server/index.js"
  },
}
```



配置打包服务端代码：

创建 config/server.config.js 文件

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

config\webpack.base.config.js

```typescript
const path = require('path')

module.exports = {
  mode: 'development',
  resolve: {
    extensions: ['.js', '.json', '.wasm', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-react', '@babel/preset-env']
        }
      }
    ]
  }
}
```

配置服务端打包命令：

package.json

```json
{
  "scripts": {
    "build:server": "webpack --config ./config/webpack.server.config.js --watch"
  },
}
```

执行命令，打包

```shell
pnpm build:server
```

配置项目启动命令：

package.json

```json
{
  "scripts": {
    "start": "nodemon ./build/server/server_bundle.js"
  },
}
```

在 /server/index.js 中，返回一个网页

src\server\index.js

```js
const express = require('express')

const app = express()

app.get('/', (req, res, next) => {
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
      <div id="root">
        
      </div>
    </body>
    </html>
  `)
})

app.listen(9000, () => {
  console.log('express 服务器启动成功了')
})
```

创建 `/src/app.jsx` 文件。

src\app.jsx

```jsx
import React, { memo, useState } from 'react'

const app = memo(() => {
  const [counter, setCounter] = useState(0);

  return (
    <div>
      <h1>App</h1>
      <div>counter: {counter}</div>
      <button onClick={() => setCounter(counter + 1)}>+1</button>
    </div>
  )
})

export default app
```

至此，SSR 服务端待见完成。

请求的页面待 hydration。

---

打包客户端代码。

新建 `/client/index.js`，作为客户端的入口。

src\client\index.js

```js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '../app';

// 在需要激活的模式下，挂载应用。
ReactDOM.hydrateRoot(document.getElementById('root'), <App />);
```

编写打包的配置文件：

config\webpack.client.config.js

```js
const path = require('path')
const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base.config');

module.exports = merge(baseConfig, {
  target: 'web',
  entry: './src/client/index.js', // 相对于项目运行的目录。
  output: {
    filename: 'client_bundle.js',
    path: path.resolve(__dirname, '../build/client')
  }
})
```

配置客户端打包的命令

package.json

```shell
{
  "scripts": {
    "build:client": "webpack --config ./config/webpack.client.config.js --watch"
  },
}
```

运行打包的命令：

```shell
pnpm build:client
```

在 express 服务器中，进行静态资源的部署：

引入 client_bundle.js 文件，进行 hydration；

```js
const express = require('express')
import React from 'react';
import ReactDOM from 'react-dom/server';
import App from '../app';

const server = express()

// 静态资源部署。
server.use(express.static('build'))

server.get('/', (req, res, next) => {
  const AppHtmlString = ReactDOM.renderToString(<App />)

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
      <div id="root">${AppHtmlString}</div>
      <script src="client/client_bundle.js"></script>
    </body>
    </html>
  `)
})

server.listen(9000, () => {
  console.log('express 服务器启动成功了')
})
```

---

路由集成

安装 react-router-dom

```shell
pnpm add react-router-dom
```

创建 Home，About 两个页面。

在 `/src` 下，新建 `/pages/Home.jsx `，`About.jsx` 文件。

src\pages\About.jsx

```jsx
import React, { memo, useState } from 'react'

const About = memo(() => {
  const [counter, setCounter] = useState(100);

  return (
    <div style="border: 1px solid green;">
      <h1>About</h1>
      <div>counter: {counter}</div>
      <button onClick={() => setCounter(counter + 1)}>+1</button>
    </div>
  )
})

export default About
```

在 `/src` 下，新建 `/router/index.js `文件。

src\router\index.js

```js
import Aboutt from '../pages/About';
import Home from '../pages/Home';

const routes = [
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/about',
    element: <Aboutt />
  }
]

export default routes
```

在 app.jsx 中，添加路由链接和路由占位。

src\app.jsx

```jsx
import React, { memo, useState } from 'react'
import { Link, useRoutes } from 'react-router-dom';

const app = memo(() => {
  const [counter, setCounter] = useState(0);

  return (
    <div style="border: 1px solid red;">
      <h1>App</h1>
      <div>counter: {counter}</div>
      <button onClick={() => setCounter(counter + 1)}>+1</button>

      <div>
        <Link to="/">
          <button>Home</button>
        </Link>
        <Link to="/about">
          <button>About</button>
        </Link>
      </div>

      {/* 路由占位 */}
      {useRoutes(routes)}
    </div>
  )
})

export default app
```

在 `server/index.js` 中，使用 StaticRouter 包裹渲染的 App

src\server\index.js

```jsx
const express = require('express')
import React from 'react'
import ReactDOM from 'react-dom/server'
import App from '../app'
import { StaticRouter } from 'react-router-dom/server'

const server = express()

// 静态资源部署。
server.use(express.static('build'))

server.get('/', (req, res, next) => {
  const AppHtmlString = ReactDOM.renderToString(
    <StaticRouter>
      <App />
    </StaticRouter>
  )

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
      <div id="root">${AppHtmlString}</div>
      <script src="client/client_bundle.js"></script>
    </body>
    </html>
  `)
})

server.listen(9000, () => {
  console.log('express 服务器启动成功了')
})

```

在 `client/index.js` 中，使用 BrowserRouter 包裹渲染的 App

```js
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '../app'
import { BrowserRouter } from 'react-router-dom'

// 在需要激活的模式下，挂载应用。
ReactDOM.hydrateRoot(
  document.getElementById('root'),
  <BrowserRouter>
    <App />
  </BrowserRouter>
)
```

运行项目。

---

Redux 集成

安装所需依赖。

```shell
pnpm add react-redux @reduxjs/toolkit
```

安装 axios

```shell
pnpm add axios
```

