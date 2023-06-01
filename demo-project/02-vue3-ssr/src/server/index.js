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
