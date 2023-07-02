import { SearchData } from '@/types/search'
import ztRequest from '..'

interface SearchParams {
  limit: number
  offset: number
  key: string
}

// 获取搜索数据
export const getProductSearchData = (data: SearchParams) =>
  ztRequest.post<SearchData>({
    url: '/store/api/product/search',
    data,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
