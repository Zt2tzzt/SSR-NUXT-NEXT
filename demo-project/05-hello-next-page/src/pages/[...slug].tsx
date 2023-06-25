import { useRouter } from 'next/router'
import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'

interface IProps {
  children?: ReactNode
}
const NotFound: FC<IProps> = memo(props => {
  const router = useRouter()
  const { slug } = router.query
  console.log('slug:', slug);
  
  return <div>404 Not Found ~</div>
})

NotFound.displayName = 'NotFound'

export default NotFound
