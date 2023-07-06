import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import Image from 'next/image'
import styles from './index.module.scss'
import { DigitalData } from '@/types/home';

interface IProps {
  children?: ReactNode
  itemData: DigitalData
}
const DigitalPanel: FC<IProps> = memo(props => {
  const { itemData } = props

  return (
    <div className={styles['digital-panel']}>
      <div className={styles['panel-left']}>
        <div className={styles['info']}>
          <Image
            className={styles.icon}
            src={itemData.digitalIcon}
            width={32}
            height={32}
            alt="next"
            priority
          ></Image>
          <div className={styles.name}>{itemData.name}</div>
        </div>
        <div className={styles.desc}>{itemData.desc}</div>
        <a href="https://music.163.com/v/w/album/rank" className={styles['buy-now']}>
          {itemData.buyNow}
        </a>
      </div>
      <div className={styles['panel-right']}>
        <Image
          className={styles.image1}
          src={itemData.picStr1}
          width={100}
          height={100}
          alt="hy next"
          priority
        ></Image>
        <Image
          className={styles.image2}
          src={itemData.picStr2}
          width={120}
          height={120}
          alt="hy next"
          priority
        ></Image>
        <i className={styles.image}></i>
      </div>
    </div>
  )
})

DigitalPanel.displayName = 'DigitalPanel'

export default DigitalPanel
