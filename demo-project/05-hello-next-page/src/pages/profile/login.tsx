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
const Login: FC<IProps> & IStaticProps = memo(props => {
  return <div>Login</div>
})

Login.displayName = 'Login'
Login.getLayout = (page: ReactElement) => (
  <Layout>
    <ProfileLayout>{page}</ProfileLayout>
  </Layout>
)

export default Login
