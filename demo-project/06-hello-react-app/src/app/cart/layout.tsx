import Link from 'next/link'
import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'

interface IProps {
  children?: ReactNode
}
const CartLayout: FC<IProps> = memo(props => {
  const { children } = props;

  return <div>
    <div>CartLayout</div>
    {children}
  </div>
})

CartLayout.displayName = 'CartLayout'

export default CartLayout
