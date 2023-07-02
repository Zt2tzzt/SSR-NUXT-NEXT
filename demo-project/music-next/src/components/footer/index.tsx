import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import classNames from 'classnames'
import styles from './index.module.scss'

interface IProps {
  children?: ReactNode
}
const Footer: FC<IProps> = memo(props => {
  return (
    <div className={styles.footer}>
      <div className={classNames('wrapper', styles.content)}>
        <div className={styles.left}>
          <div className={styles.first}>
            <a href="">服务条款</a>
            <span>|</span>
            <a href="">隐私政策</a>
            <span>|</span>
            <a href="">儿童隐私政策</a>
            <span>|</span>
            <a href="">版权投诉指引</a>
            <span>|</span>
            <a href="">联系我们</a>
          </div>

          <div>
            <a href="">网易公司版权所有©1997-2022</a>
            <a href="">杭州乐读科技有限公司运营：浙网文[2021] 1186-054号</a>
          </div>

          <div>
            <a href="">食品经营许可证</a>
            <a href="">出版物经营许可证</a>
            <a href="">营业执照</a>
            <a href="">网络食品交易第三方平台提供者信息备案: 浙网食A33010041</a>
            <a href="">进口冷链管理承诺书</a>
          </div>
          <div>
            <a href="">粤B2-20090191-18</a>
            <a href="">举报邮箱：工业和信息化部备案管理系统网站</a>
          </div>
        </div>
        <div className={styles.right}>
          <a href="" className={styles.icon1}></a>
          <a href="" className={styles.icon2}></a>
          <a href="" className={styles.icon3}></a>
          <a href="" className={styles.icon4}></a>
        </div>
      </div>
    </div>
  )
})

Footer.displayName = 'Footer'

export default Footer
