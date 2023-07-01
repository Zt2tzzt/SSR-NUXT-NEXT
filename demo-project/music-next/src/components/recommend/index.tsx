import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import styles from './index.module.scss'
import classNames from 'classnames'
import type { Recommend } from '@/types/home'
import { Col, Row } from 'antd'
import Image from 'next/image'
import Link from 'next/link'

interface IProps {
  children?: ReactNode
  recommends: Recommend[]
}
const Recommend: FC<IProps> = memo(props => {
  const { recommends } = props

  return (
    <div className={styles['recommend']}>
      <div className={classNames('wrapper', styles['content'])}>
        <Row>
          {recommends.map(item => (
            <Col key={item.id} span={12}>
              <Link href={'/detail?id=' + item.id} className={styles['recommend-item']}>
                <Image
                  className={styles.image}
                  src={item.picStr!}
                  alt="recommend"
                  width={542}
                  height={300}
                ></Image>
              </Link>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  )
})

Recommend.displayName = 'Recommend'

export default Recommend
