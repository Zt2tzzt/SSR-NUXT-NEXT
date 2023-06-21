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
