import type { AllProduct, HotProduct } from '@/types/product'
import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { Col, Row } from 'antd'
import GridViewItem from '../grid-view-item'
import styles from './index.module.scss'

interface IProps {
  children?: ReactNode
  products: HotProduct[] | AllProduct[]
}
const GridView: FC<IProps> = memo(props => {
  const { products } = props

  return (
    <div className={'grid-view'}>
      <Row>
        {products.map((product, index) => {
          return (
            <Col key={product.id} span={6}>
              <div className={styles['view-item']}>
                <GridViewItem product={product} showTip ={index === 0}></GridViewItem>
              </div>
            </Col>
          )
        })}
      </Row>
    </div>
  )
})

GridView.displayName = 'GridView'

export default GridView
