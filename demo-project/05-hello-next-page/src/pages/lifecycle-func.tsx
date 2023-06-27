import React, { memo, useEffect } from 'react'
import type { FC, ReactNode } from 'react'

interface IProps {
  children?: ReactNode
}
const LifecycleFunc: FC<IProps> = memo(props => {
  console.log('func body~'); // 服务端，客户端，执行
  
  useEffect(() => {
    console.log('useEffect mounted~') // 客户端，执行

    return () => {
      console.log('useEffect unmounted~'); // 客户端，执行
    }
  })

  return <div>LifecycleFunc</div>
})

LifecycleFunc.displayName = 'LifecycleFunc'

export default LifecycleFunc
