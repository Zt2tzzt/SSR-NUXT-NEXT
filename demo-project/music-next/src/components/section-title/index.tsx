import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import styles from './index.module.scss'

interface IProps {
  children?: ReactNode
  title: string
}
const SectionTitle: FC<IProps> = memo(props => {
  const { title } = props

  return <div className={styles['section-title']}>{title}</div>
})

SectionTitle.displayName = 'SectionTitle'

export default SectionTitle
