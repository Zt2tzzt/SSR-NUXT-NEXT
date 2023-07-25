import React, { memo, useState } from 'react'
import { Link, useRoutes } from 'react-router-dom';
import routes from './router';

const app = memo(() => {
  const [counter, setCounter] = useState(0);

  return (
    <div style={{border: '1px solid red'}}>
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