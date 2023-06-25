import { useRouter } from 'next/router'
import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'

interface IProps {
  children?: ReactNode
}
const Detail02: FC<IProps> = memo(props => {
  const router = useRouter()
  const { role, id } = router.query;
  console.log('role:', role, 'id:', id);
  

  return <div>Detail02</div>
})

Detail02.displayName = 'Detail02'

export default Detail02
