const express = require('express')
import React from 'react'
import ReactDOM from 'react-dom/server'
import App from '../app'
import { StaticRouter } from 'react-router-dom/server'
import store from '../store'
import { Provider } from 'react-redux'

const server = express()

// 静态资源部署。
server.use(express.static('build'))

server.get('/', (req, res, next) => {
  const AppHtmlString = ReactDOM.renderToString(
    <Provider store={store}>
      <StaticRouter>
        <App />
      </StaticRouter>
    </Provider>
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
