import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'

interface IProps {
  children?: ReactNode
}
const User: FC<IProps> = memo(props => {
  return <div>User</div>
})

User.displayName = 'User'

export default User
