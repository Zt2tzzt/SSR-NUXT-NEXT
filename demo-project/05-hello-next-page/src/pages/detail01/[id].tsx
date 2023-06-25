import { useRouter } from 'next/router'
import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'

interface IProps {
  children?: ReactNode
}
const Detail01: FC<IProps> = memo(props => {
  const router = useRouter()
  console.log('router.query:', router.query); // 没有 params 属性，
  // query 既可以拿到查询字符串，也可以拿到动态路由的 params，如果重复，取动态路由的 params

  const { id } = router.query;
  console.log('id:', id);
  

  return <div>Detail01</div>
})

Detail01.displayName = 'Detail01'

export default Detail01
