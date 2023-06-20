import type { IDetailProductType, IDetailData } from '@/types/detail.d';
import type { IResultData } from '@/types/global.d';
import ztRequest from './index'

export const getDetailInfo = (type: IDetailProductType) => ztRequest.get<IResultData<IDetailData[]>>('/oppoDetail', { type })
