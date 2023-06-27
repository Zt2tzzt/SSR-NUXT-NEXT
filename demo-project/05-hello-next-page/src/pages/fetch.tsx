import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import ztRequest from '@/service'
import type { Data } from '@/types/fetch';

interface IProps {
  children?: ReactNode
}
const fetch: FC<IProps> = memo(props => {
  async function getHomeInfo() {
    const res = await ztRequest.request<Data>({
      url: 'homeInfo',
      method: 'GET'
    })

    console.log('res:', res)
  }

  return <div>
    <div>fetch</div>
    <button onClick={getHomeInfo}>getHomeInfo</button>
  </div>
})

fetch.displayName = 'fetch'

export default fetch
