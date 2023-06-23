import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'

interface IProps {
  children?: ReactNode
}
const Find: FC<IProps> = memo(props => {
  return <div>Find</div>
})

Find.displayName = 'Find'

export default Find
