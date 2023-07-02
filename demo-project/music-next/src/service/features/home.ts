import type { IResultData } from '@/types/global'
import type { HomeInfo, SearchSuggest } from '@/types/home'
import type { AllProductInfo, DetailProductInfo, ProductInfo } from '@/types/product'
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

export const getAllProductInfo = () =>
  ztRequest.get<IResultData<AllProductInfo>>({
    url: '/allProduct/gets'
  })

export const getDetailProductInfo = (id: number) =>
  ztRequest.get<IResultData<DetailProductInfo>>({
    url: '/special/getdetail?specialTopicId=' + id
  })
