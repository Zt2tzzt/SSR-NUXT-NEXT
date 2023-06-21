import React, { memo, useState } from 'react'

const About = memo(() => {
  const [counter, setCounter] = useState(100);

  return (
    <div style={{border: '1px solid green'}}>
      <h1>About</h1>
      <div>counter: {counter}</div>
      <button onClick={() => setCounter(counter + 1)}>+1</button>
    </div>
  )
})

export default About