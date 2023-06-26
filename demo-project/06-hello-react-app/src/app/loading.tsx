import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'

interface IProps {
  children?: ReactNode
}
const Loading: FC<IProps> = memo(props => {
  return <h1>Loading...</h1>
})

Loading.displayName = 'Loading'

export default Loading
