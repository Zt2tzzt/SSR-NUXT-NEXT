import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'

interface IProps {
  children?: ReactNode
}
const Test: FC<IProps> = memo(props => {
  return <div>Test</div>
})

Test.displayName = 'Test'

export default Test
