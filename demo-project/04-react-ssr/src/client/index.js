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
