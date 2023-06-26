import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'

interface IProps {
  children?: ReactNode
}
const Login: FC<IProps> = memo(props => {
  return (
    <div className="login">
      <div>Login</div>
    </div>
  )
})

Login.displayName = 'Login'

export default Login
