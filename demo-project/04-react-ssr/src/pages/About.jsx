import React, { memo, useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { fetchHomeData, incrementAction } from '../store/features/home'

const About = memo(() => {
  // const [counter, setCounter] = useState(100);

  const { counter } = useSelector(state => ({
    counter: state.home.counter
  }), shallowEqual)

  const dispatch = useDispatch()
  const onAddButtonClick = () => {
    // setCounter(counter + 1)
    dispatch(incrementAction(2))
  }
  return (
    <div style={{border: '1px solid green'}}>
      <h1>About</h1>
      <div>counter: {counter}</div>
      <button onClick={() => onAddButtonClick()}>+2</button>
      <button onClick={() => dispatch(fetchHomeData())}>fetchHomeData</button>
    </div>
  )
})

export default About