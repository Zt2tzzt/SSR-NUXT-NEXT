import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import ztRequest from '@/service'
import type { Data } from '@/types/fetch';
import axios from 'axios';
import { setCookie } from 'cookies-next';

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

  async function getUserInfo() {
    const res = await axios.get('/api/user')
    console.log('user mock res:', res);
  }

  function getLoginInfo() {
    axios.post('/api/login?id=100', {
      username: 'zzt',
      password: 123456
    }).then(res => {
      console.log(res.data);
      setCookie('token', res.data.token, {
        maxAge: 60
      })
    })
  }

  return <div>
    <div>fetch</div>
    <button onClick={getHomeInfo}>getHomeInfo</button>
    <button onClick={getUserInfo}>getUserInfo</button>
    <button onClick={getLoginInfo}>getLoginInfo</button>

  </div>
})

fetch.displayName = 'fetch'

export default fetch
