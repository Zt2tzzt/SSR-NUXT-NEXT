import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import styles from './index.module.scss'
import classNames from 'classnames'
import Link from "next/link";
import Search from "../search";
import { useSelector } from 'react-redux';
import type { IAppRootState } from '@/stores';

interface IProps {
  children?: ReactNode
}
const NavBar: FC<IProps> = memo(props => {

  const { navbar } = useSelector((rootState: IAppRootState) => ({
    navbar: rootState.home.navbar
  }))
  
  return (
    <div className={styles.navbar}>
      <div className={classNames("wrapper", styles.content)}>
        {/* 左侧区域 */}
        <div className={styles["content-left"]}>
          <Link href="/" className={styles.logo}></Link>
          <h1 className={styles.title}>云音乐商城 - 音乐购有趣</h1>
        </div>

        {/* 右侧区域 */}
        <div className={styles["content-right"]}>
          <Search searchData={navbar}></Search>
          {/* 购物车 */}
          <div className={styles["right-cart"]}>
            <Link href="/" className={styles.cart}>
              <span className={styles.count}>6</span>
            </Link>
          </div>
          <div className={styles["right-login"]}>登录</div>
        </div>
      </div>
    </div>
  )
})

NavBar.displayName = 'NavBar'

export default NavBar
