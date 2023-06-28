import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'

interface IProps {
  children?: ReactNode
}
const About: FC<IProps> = memo(props => {
  return (
    <div>
      <div>About</div>
      <div>不带有数据的，静态生成的页面</div>
    </div>
  )
})

About.displayName = 'About'

export default About
