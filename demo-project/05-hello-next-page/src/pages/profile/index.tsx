import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'

interface IProps {
  children?: ReactNode
}
const Profile: FC<IProps> = memo(props => {
  return <div>Profile</div>
})

Profile.displayName = 'Profile'

export default Profile
