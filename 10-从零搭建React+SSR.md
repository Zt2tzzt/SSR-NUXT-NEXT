# 从零搭建 React + SSR

React 和 Vue 一样，除了支持开发 SPA 应用，也支持开发 SSR 应用。

## 一、Node Server 搭建

React18 + SSR 搭建

依赖安装

```shell
pnpm add express react react-dom

pnpm add -D nodemon webpack webpack-cli webpack-node-externals webpack-merge @babel/core babel-loader @babel/preset-react @babel/preset-env
```

创建 `src/server/index.js`，在其中创建 *express* 服务。

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

配置打包服务端代码的配置文件：

创建 `config/server.config.js` 文件

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

执行命令，打包服务端代码。

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

服务端入口文件编写：

在 `/server/index.js` 中：

用 `ReactDOM.renderToString` 来进行渲染应用。

并返回一个网页

src\server\index.js

```js
const express = require('express')
import React from 'react'
import ReactDOM from 'react-dom/server'
import App from '../app'

const app = express()

app.get('/', (req, res, next) => {
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
    </body>
    </html>`
  )
})

app.listen(9000, () => {
  console.log('express 服务器启动成功了')
})
```

应用程序入口文件编写：

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

## 二、React Client 搭建

创建 React SSR 应用，需要调用 `ReactDOM.hydrateRoot` 函数，而不是 `ReactDOM.createRoot`

- `createRoot` ：创建一个 Root，接着调用其 `render` 函数，将 App 直接挂载到页面上。
- `hydrateRoot` ：创建水合 Root ，表示在激活的模式下渲染 App

客户端的入口 `/client/index.js`；

src\client\index.js

```js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '../app';

// 在需要激活的模式下，挂载应用。
ReactDOM.hydrateRoot(document.getElementById('root'), <App />);
```

编写打包客户端的配置文件：

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

在服务端，引入 `client_bundle.js` 文件，进行 hydration；

src\server\index.js

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

### 1.路由集成

安装 *react-router-dom*

```shell
pnpm add react-router-dom
```

创建 Home，About 两个页面。

在 `/src` 下，新建 `/pages/Home.jsx`，`About.jsx` 文件。

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

在 `/src` 下，新建 `/router/index.js`文件。

src\router\index.js

```jsx
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

在 `app.jsx` 中，添加路由链接和路由占位。

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

      {/* 路由链接 */}
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

在 `server/index.js` 中，

使用 `<StaticRouter>` 包裹渲染的 `<App>`

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

在 `client/index.js` 中：

使用 `<BrowserRouter>` 包裹渲染的 `<App>`。

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

### 2.Redux 集成

安装所需依赖。

```shell
pnpm add react-redux @reduxjs/toolkit
```

回顾早期 Redux 的使用。

- 早期使用 redux 时，会将 redux 代码拆分在多个模块中，每个模块需包含多个文件，如："constants"、"action"、"reducer"、"index" 等；
- 然后使用 `combineReducers` 对多个模块合并；
- 这种代码组织方式过于繁琐和麻烦，导致代码量过多，也不利于后期管理;

Redux Toolkit 就是为解决这种编码方式而诞生。它也是目前官方推荐的，编写 Redux 逻辑的方法。

Redux Toolkit 的核心 API 主要是如下几个：

- `configureStore`；
- `createSlice`；
- `createAsyncThunk`。

创建 `/store` 目录，在其中创建 `/features/home.js`：

`createSlice`：自动生成“切片 reducer”，并带有相应的 actions，接收：

- “切片名称”；
- “初始状态值”
- “reducer 函数对象”，

src\store\features\home.js

```js
import { createSlice } from '@reduxjs/toolkit'

const homeSlice = createSlice({
  name: 'home',
  initialState: {
    count: 0
  },
  reducers: {
    incrementAction(state, { payload }){
      state.count += payload
    }
  }
})

export const { incrementAction } = homeSlice.actions
export default homeSlice.reducer
```

创建 `/store/index.js`，作为状态管理的入口。

`configureStore` 包装 `createStore` 以提供简化的配置选项和良好的默认值，

用于创建 store 对象，常见参数如下：

- `reducer`，将 slice 中的 reducer 可以组成一个对象传入此处；
- `middleware`：可以使用参数，传入其他的中间件（默认包含 redux-thunk）；
- `devTools`：是否启用 Redux DevTools 工具，默认为 `true`；

src\store\index.ts

```js
import { configureStore } from "@reduxjs/toolkit";
import homeReducer from './features/home';

const store = configureStore({
  reducer: {
    home: homeReducer
  },
  // devTools: true // 默认值
})

export default store
```

在客户端渲染 `<App />` 时，提供 store

引入 react-redux 的 `Provider`，给所有的子或孙子组件提供 store 对象；

src\client\index.js

```js
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '../app'
import { BrowserRouter } from 'react-router-dom'
import store from '../store'
import { Provider } from 'react-redux'

// 在需要激活的模式下，挂载应用。
ReactDOM.hydrateRoot(
  document.getElementById('root'),
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
)
```

同样的，在服务端渲染 `<App />` 时，提供 store

src\server\index.js

```js
server.get('/', (req, res, next) => {
  const AppHtmlString = ReactDOM.renderToString(
    <Provider store={store}>
      <StaticRouter>
        <App />
      </StaticRouter>
    </Provider>
  )
  //...
}
```

在 `Home.jsx` 中，使用 store。

在函数式组件中，使用 react-redux 提供的 Hooks API 连接、操作 store。

- `useSelector` 从 store 中获取数据（root state）。
- `useDispatch` 返回 redux store 的 dispatch 引用。使用它来 dispatch actions。
- `useStore` 返回一个 store 引用，和 Provider 组件引用完全一致。

src\pages\Home.jsx

```jsx
import React, { memo, useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { incrementAction } from '../store/features/home'

const Home = memo(() => {
  // const [counter, setCounter] = useState(100);

  const { counter } = useSelector(state => ({
    counter: state.home.counter
  }), shallowEqual)

  const dispatch = useDispatch()
  const onAddButtonClick = () => {
    // setCounter(counter + 1)
    dispatch(incrementAction(1))
  }

  return (
    <div style={{ border: '1px solid blue' }}>
      <h1>Home</h1>
      <div>counter: {counter}</div>
      <button onClick={() => onAddButtonClick()}>+1</button>
    </div>
  )
})

export default Home
```

同样的，在 `About.jsx` 中，使用 store

src\pages\About.jsx

```jsx
import React, { memo, useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { incrementAction } from '../store/features/home'

const About = memo(() => {
  // const [counter, setCounter] = useState(100);

  const { counter } = useSelector(state => ({
    counter: state.home.counter
  }), shallowEqual)

  const dispatch = useDispatch()
  const onAddButtonClick = () => {
    // setCounter(counter + 1)
    dispatch(incrementAction(2))
  }
  return (
    <div style={{border: '1px solid green'}}>
      <h1>About</h1>
      <div>counter: {counter}</div>
      <button onClick={() => onAddButtonClick()}>+2</button>
    </div>
  )
})

export default About
```

### 3.异步 action 使用

安装 axios

```shell
pnpm add axios
```

使用 RTK 提供的`createAsyncThunk`:

生成一个 `pending`/`fulfilled`/`rejected` 基于该承诺分派动作类型的 thunk。简单理解就是专门用来创建异步Action。它接收：

- 一个动作类型字符串
- 一个返回承诺的函数，

在 `/store/home.ts` 中，使用

src\store\features\home.js

```js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchHomeData = createAsyncThunk(
  'home/fetchHomeData',
  async (payload, { dispatch, getState }) => {
    const res = await axios.get('http://codercba.com:9060/juanpi/api/homeInfo')
    return res.data
  }
)

const homeSlice = createSlice({
  name: 'home',
  initialState: {
    counter: 1000,
    homeInfo: null
  },
  reducers: {
    incrementAction(state, { payload }) {
      state.counter += payload
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchHomeData.fulfilled, (state, { payload, type }) => {
      console.log('type:', type)
      console.log('payload:', payload)
      state.homeInfo = payload
    })
  }
})

export const { incrementAction } = homeSlice.actions
export default homeSlice.reducer
```

在 `About.jsx` 中，派发异步 action，

src\pages\About.jsx

```jsx
//...

const About = memo(() => {
  const dispatch = useDispatch()

  return (
    <div style={{border: '1px solid green'}}>
      <button onClick={() => dispatch(fetchHomeData())}>fetchHomeData</button>
    </div>
  )
})

//...
```
