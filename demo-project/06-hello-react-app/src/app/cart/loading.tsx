import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'

interface IProps {
  children?: ReactNode
}
const CartLoading: FC<IProps> = memo(props => {
  return <h1>Cart Loading...</h1>
})

CartLoading.displayName = 'CartLoading'

export default CartLoading
