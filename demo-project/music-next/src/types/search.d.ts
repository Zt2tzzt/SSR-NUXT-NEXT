import type { Product } from './product';

export interface SearchData {
  all: number
  size: number
  more: boolean
  products: Product[]
  code: number
}

/* export interface Product {
  stock: number
  saleNum: number
  sumMoney: any
  skus: any
  discount: any
  pickUp: boolean
  picIds: string[]
  couponLabelDesc?: string
  label: string
  couponLabelFlag: number
  priceType: number
  levelLimit: number
  vipLimit: boolean
  allowDupBuy: boolean
  extInfo: ExtInfo
  specialType: number
  shopId: number
  exchangeType: number
  useVipPrice: boolean
  suggestWord: string
  pubTime: number
  category2: number
  brandName: string
  statistics: number
  picUrls: string[]
  drawTime: number
  coverUrl: string
  performanceTime: number
  coverIdStr: string
  createTime: number
  category1: number
  alterStock: number
  iap: boolean
  tags: string[]
  display: number
  status: number
  name: string
  id: number
  type: number
  minPrice: number
  originalCost: number
  maxPrice: number
} */

export interface ExtInfo {
  albumId: number
  songId: number
  goodVipType: number
  quotaOfOrder: number
  extProductId: number
  extProductStatus: number
  extShelfStatus: number
  concertId: number
  buysingle: boolean
  showStartProId: number
  needMessage: number
  preSale: number
  defaultMessage: string
  tax: string
  albumSaleDisplayType: number
  restrict: number
  giftSet: number
  hiddenCanBuy: boolean
  preSaleFlag: boolean
}
