import type { IResultData } from '@/types/global'
import type { HomeInfo, SearchSuggest } from '@/types/home'
import type { ProductInfo } from '@/types/product'
import ztRequest from '..'

export const getSearchSuggest = () =>
  ztRequest.get<IResultData<SearchSuggest>>({
    url: '/searchSuggest/get'
  })

export const getHomeInfo = () =>
  ztRequest.get<IResultData<HomeInfo>>({
    url: '/home/info'
  })

export const getProductInfo = () =>
  ztRequest.get<IResultData<ProductInfo>>({
    url: '/hotproduct_v2/gets'
  })
