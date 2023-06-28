import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler (req: NextApiRequest, res: NextApiResponse) {

  // 数据来源可以是：1.mock，2.数据库，3.网络请求。
  const userInfo = {
    name: 'zzt',
    age: 18
  }

  res.status(200).send(userInfo)
}
