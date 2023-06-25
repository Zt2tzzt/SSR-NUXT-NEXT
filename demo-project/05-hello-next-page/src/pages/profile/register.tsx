import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import type { ReactElement } from 'react'
import Layout from '@/layout';
import ProfileLayout from '@/layout/ProfileLayout';

export interface IStaticProps {
  getLayout?: (page: ReactElement) => ReactElement
}

interface IProps {
  children?: ReactNode
}
const Register: FC<IProps> & IStaticProps = memo(props => {
  return <div>Register</div>
})

Register.displayName = 'Register'
Register.getLayout = (page: ReactElement) => (
  <Layout>
    <ProfileLayout>{page}</ProfileLayout>
  </Layout>
)

export default Register
