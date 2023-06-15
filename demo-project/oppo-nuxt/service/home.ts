import ztRequest from './index'
import type { IResultData } from './index'

type HomeInfoType = 'oppo' | 'onePlus' | 'intelligent'

export const fetchHomeInfo = (type: HomeInfoType = 'oppo') => {
  return ztRequest.get<IResultData<any>>('/home/info', {
    type
  })
}
