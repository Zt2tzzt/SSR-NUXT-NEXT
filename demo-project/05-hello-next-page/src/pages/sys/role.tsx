import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'

interface IProps {
  children?: ReactNode
}
const Role: FC<IProps> = memo(props => {
  return <div>Role</div>
})

Role.displayName = 'Role'

export default Role
