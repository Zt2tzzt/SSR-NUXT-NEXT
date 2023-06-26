import Link from 'next/link'
import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'

interface IProps {
  children?: ReactNode
}
const ProfileLayout: FC<IProps> = memo(props => {
  const { children } = props

  return (
    <div>
      <div>ProfileLayout</div>
      <Link href={'/profile'}>
        <button>profile</button>
      </Link>
      <Link href={'/profile/login'}>
        <button>login</button>
      </Link>
      <Link href={'/profile/register'}>
        <button>login</button>
      </Link>
      {children}
    </div>
  )
})

ProfileLayout.displayName = 'ProfileLayout'

export default ProfileLayout
