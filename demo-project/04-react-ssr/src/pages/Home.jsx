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
