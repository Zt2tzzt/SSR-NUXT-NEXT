import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import type { HotProduct, AllProduct, Product } from '@/types/product'
import Link from 'next/link'
import Image from 'next/image'
import styles from './index.module.scss'

interface IProps {
  children?: ReactNode
  product: HotProduct | AllProduct | Product
  showTip: boolean
}
const GridViewItem: FC<IProps> = memo(props => {
  const { product, showTip } = props;
  const newProduct = 'products' in product ? product.products : product

  return (
    <div className={styles['grid-view-item']}>
      <div className={styles['item-image']}>
        <Image
          className={styles.image}
          src={newProduct?.coverUrl!}
          alt="image"
          width={263}
          height={263}
          priority
        ></Image>

        {showTip && (
          <div className={styles.tip}>
            <div className={styles['min-price']}>¥{newProduct?.minPrice}</div>
            <div className={styles['original-cost']}>¥{newProduct?.originalCost}</div>
          </div>
        )}
      </div>
      <div className={styles['item-info']}>
        {/* label */}
        {newProduct?.couponLabelDesc && (
          <span className={styles.label}>{newProduct.couponLabelDesc}</span>
        )}
        {/* name */}
        <Link href="/" className={styles.name}>
          {newProduct?.name}
        </Link>
      </div>
      <div className={styles['item-price']}>¥{newProduct?.minPrice}</div>
    </div>
  )
})

GridViewItem.displayName = 'GridViewItem'

export default GridViewItem
