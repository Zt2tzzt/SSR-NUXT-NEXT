import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import styles from './index.module.scss'
import classNames from 'classnames'

interface IProps {
  children?: ReactNode
}
const NavBar: FC<IProps> = memo(props => {
  return (
    <div className={styles.navbar}>
      <div className={classNames('wrapper', styles.content)}>Navbar</div>
    </div>
  )
})

NavBar.displayName = 'NavBar'

export default NavBar
