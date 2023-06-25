import { useRouter } from 'next/router'
import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'

interface IProps {
  children?: ReactNode
}
const Detail03NotFound: FC<IProps> = memo(props => {
    const router = useRouter()
  const { slug } = router.query
  console.log('slug:', slug);

  return <div>404 Detail03 Not Found ~</div>
})

Detail03NotFound.displayName = 'Detail03NotFound'

export default Detail03NotFound
