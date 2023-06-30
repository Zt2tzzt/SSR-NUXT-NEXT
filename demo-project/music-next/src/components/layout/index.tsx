import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import NavBar from '../navbar'
import Footer from '../footer'

interface IProps {
  children?: ReactNode
}
const Layout: FC<IProps> = memo(props => {
  const { children } = props
  return (
    <div>
      <NavBar></NavBar>

      {children}

      <Footer></Footer>
    </div>
  )
})

Layout.displayName = 'Layout'

export default Layout
