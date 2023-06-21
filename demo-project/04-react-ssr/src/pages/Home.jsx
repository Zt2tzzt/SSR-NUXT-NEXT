import React, { memo, useState } from 'react'

const Home = memo(() => {
  const [counter, setCounter] = useState(100);

  return (
    <div style={{border: '1px solid blue'}}>
      <h1>Home</h1>
      <div>counter: {counter}</div>
      <button onClick={() => setCounter(counter + 1)}>+1</button>
    </div>
  )
})

export default Home