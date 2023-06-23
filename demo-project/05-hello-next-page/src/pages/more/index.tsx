import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'

interface IProps {
  children?: ReactNode
}
const More: FC<IProps> = memo(props => {
  return <div>More</div>
})

More.displayName = 'More'

export default More
