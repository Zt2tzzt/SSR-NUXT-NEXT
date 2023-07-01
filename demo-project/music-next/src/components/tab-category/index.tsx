import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import styles from './index.module.scss'
import classNames from 'classnames'
import type { Category } from '@/types/home'
import { Col, Row } from 'antd'
import Image from 'next/image'

interface IProps {
  children?: ReactNode
  categorys: Category[]
}
const TabCategory: FC<IProps> = memo(props => {
  const { categorys } = props

  return (
    <div className={styles['tab-category']}>
      <div className={classNames('wrapper', styles['content'])}>
        <Row>
          {categorys.map(item => (
            <Col span={6} key={item.cid}>
              <div className={styles['category-item']}>
                <Image
                  className={styles['image']}
                  src={item.picStr!}
                  alt="category"
                  width={48}
                  height={48}
                ></Image>

                <div className={styles['right']}>
                  <div className={styles['title']}>{item.title}</div>
                  {/* 描述 type == 1 才会显示*/}
                  {item.type === 1 && (
                    <div className={styles['sub-title']}>
                      <span className={styles['count']}>{item.count}</span>
                      <span className={styles['desc']}>{item.desc}</span>
                    </div>
                  )}
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  )
})

TabCategory.displayName = 'TabCategory'

export default TabCategory
