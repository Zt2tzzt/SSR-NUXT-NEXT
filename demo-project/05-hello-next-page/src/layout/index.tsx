import React, { Children, memo } from 'react'
import type { FC, ReactNode } from 'react'
import styles from './index.module.css'

interface IProps {
  children?: ReactNode
}
const Layout: FC<IProps> = memo(props => {
  const { children } = props

  return (
    <div className="layout">
      <div className={styles['header']}>header</div>
      {children}
      <div className={styles['footer']}>footer</div>
    </div>
  )
})

Layout.displayName = 'Layout'

export default Layout
