import ztRequest from './index'
import type { IResultData } from '@/types/global'
import type { HomeInfoType, IHomeData } from '@/types/home';

export const getHomeInfo = (type: HomeInfoType = 'oppo') => {
  return ztRequest.get<IResultData<IHomeData>>('/home/info', {
    type
  })
}
