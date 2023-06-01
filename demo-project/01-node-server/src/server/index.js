const express = require('express')

const app = express()

app.get('/', (req, res, next) => {
  res.send(`Hello Node Server`)
})

app.listen(9000, () => {
  console.log('start node server on port 9000 ~')
})