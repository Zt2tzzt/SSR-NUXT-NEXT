import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'

interface IProps {
  children?: ReactNode
}
const ProfileLayout: FC<IProps> = memo(props => {
  return (
    <div>
      <h1>ProfileLayout</h1>
      {props.children}
    </div>
  )
})

ProfileLayout.displayName = 'ProfileLayout'
export default ProfileLayout
