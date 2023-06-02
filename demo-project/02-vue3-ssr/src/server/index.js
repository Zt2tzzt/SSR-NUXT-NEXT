const express = require('express')
import createApp from '../app';
import { renderToString } from 'vue/server-renderer';
import createRouter from '../router/index';
// 在 node 环境中，要用 createMemoryHistory
import { createMemoryHistory } from 'vue-router';
import { createPinia } from 'pinia';

const server = express()

// express 部署静态资源
server.use(express.static('build'))

server.get('/*', async (req, res, next) => {
  // 创建 app
  const app = createApp()

  // 创建 pinia
  const pinia = createPinia()
  app.use(pinia)

  // 创建 router
  const router = createRouter(createMemoryHistory())
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
