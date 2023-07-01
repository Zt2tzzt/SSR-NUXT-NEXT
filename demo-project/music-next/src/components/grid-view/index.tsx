import type { HotProduct } from '@/types/product'
import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'

interface IProps {
  children?: ReactNode
  products: HotProduct[]
}
const GridView: FC<IProps> = memo(props => {
  return <div className={'grid-view'}>
    GridView
  </div>
})

GridView.displayName = 'GridView'

export default GridView
