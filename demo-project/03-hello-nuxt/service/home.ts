import ztRequest from './index';
import type { IResultData } from './index';

export const fetchHomeInfoData = () => {
  return ztRequest.get<IResultData<any>>('/homeInfo')
}