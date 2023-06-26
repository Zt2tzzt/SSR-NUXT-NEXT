import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'

interface IProps {
  children?: ReactNode
}
const Register: FC<IProps> = memo(props => {
  return (
    <div className="register">
      <div>Register</div>
    </div>
  )
})

Register.displayName = 'Register'

export default Register
