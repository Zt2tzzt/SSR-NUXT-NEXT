import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'

interface IProps {
  children?: ReactNode
}
const Footer: FC<IProps> = memo(props => {
  return <div>Footer</div>
})

Footer.displayName = 'Footer'

export default Footer
