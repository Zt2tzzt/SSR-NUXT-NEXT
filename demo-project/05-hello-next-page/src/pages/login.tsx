import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { setCookies } from 'cookies-next'

interface IProps {
  children?: ReactNode
}
const Login: FC<IProps> = memo(props => {
  const onLoginClick = () => {
    setCookies('token', 'aabbcc', {
      maxAge: 10
    })
  }

  return (
    <div>
      <h3>login</h3>
      <button onClick={() => onLoginClick()}>login</button>
    </div>
  )
})

Login.displayName = 'Login'

export default Login
