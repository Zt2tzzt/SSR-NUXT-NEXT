import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import type { ReactElement } from 'react'
import Layout from '@/layout'
import ProfileLayout from '@/layout/ProfileLayout'
import Link from 'next/link'

export interface IStaticProps {
  getLayout?: (page: ReactElement) => ReactElement
}

interface IProps {
  children?: ReactNode
}
const Profile: FC<IProps> & IStaticProps = memo(props => {
  return (
    <div>
      <h2>Profile</h2>
      <Link href={'/profile/login'}>
        <button>profiel login</button>
      </Link>
      <Link href={'/profile/register'}>
        <button>profiel register</button>
      </Link>
    </div>
  )
})

Profile.displayName = 'Profile'

Profile.getLayout = (page: ReactElement) => (
  <Layout>
    <ProfileLayout>{page}</ProfileLayout>
  </Layout>
)
export default Profile
