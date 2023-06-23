import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'

interface IProps {
  children?: ReactNode
}
const Cart: FC<IProps> = memo(props => {
  return <div>Cart</div>
})

Cart.displayName = 'Cart'

export default Cart
