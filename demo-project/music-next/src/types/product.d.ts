export interface ProductInfo {
  count: number
  hasMore: boolean
  hotProduct: HotProduct[]
}

export interface HotProduct {
  db_create_time: number
  id: number
  name: string
  price: any
  productId: number
  resourceUrl: any
  orderWeight: number
  products: Products
  db_update_time: number
}

export interface Products {
  stock: number
  saleNum: number
  sumMoney: any
  skus: any
  discount: any
  pickUp: boolean
  couponLabelFlag: number
  tags: string[]
  display: number
  status: number
  iap: boolean
  label: string
  pubTime: number
  createTime: number
  priceType: number
  levelLimit: number
  vipLimit: boolean
  allowDupBuy: boolean
  extInfo: ExtInfo
  specialType: number
  shopId: number
  exchangeType: number
  useVipPrice: boolean
  category1: number
  suggestWord: string
  category2: number
  brandName: string
  drawTime: number
  alterStock: number
  statistics: number
  picUrls: string[]
  coverIdStr: string
  performanceTime: number
  coverUrl: string
  picIds: string[]
  couponLabelDesc?: string
  name: string
  id: number
  type: number
  minPrice: number
  originalCost: number
  maxPrice: number
  alg: string
}

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
  message?: string
}

export interface AllProductInfo {
  count: number
  allProduct: AllProduct[]
}

export interface AllProduct {
  stock: number
  saleNum: number
  sumMoney: any
  skus: any
  discount: any
  pickUp: boolean
  tags: string[]
  display: number
  status: number
  priceType: number
  levelLimit: number
  vipLimit: boolean
  allowDupBuy: boolean
  extInfo: ExtInfo
  specialType: number
  shopId: number
  exchangeType: number
  useVipPrice: boolean
  createTime: number
  iap: boolean
  picIds: string[]
  couponLabelFlag: number
  pubTime: number
  label?: string
  couponLabelDesc?: string
  drawTime: number
  picUrls: string[]
  coverUrl: string
  statistics: number
  alterStock: number
  category1: number
  performanceTime: number
  category2: number
  brandName: string
  suggestWord: string
  coverIdStr: string
  name: string
  id: number
  type: number
  minPrice: number
  originalCost: number
  maxPrice: number
  vipMinPrice?: number
  vipMaxPrice?: number
}

export interface DetailProductInfo {
  id: number
  name: string
  linkedUrl: any
  coverStatus: any
  webPic: string
  mobilePic: string
  productNum: number
  create_time: any
  specialTopicProducts: SpecialTopicProduct[]
  specialTopicPVUVList: any
  products: Product[]
}

export interface SpecialTopicProduct {
  productId: number
  productName: any
  price: any
  productPicURL: any
  onlineStock: number
  order: number
}

export interface Product {
  stock: number
  saleNum: number
  sumMoney: any
  skus: any
  discount: any
  pickUp: boolean
  statistics: number
  picUrls: string[]
  couponLabelFlag: number
  label?: string
  priceType: number
  levelLimit: number
  vipLimit: boolean
  allowDupBuy: boolean
  extInfo: ExtInfo
  specialType: number
  shopId: number
  exchangeType: number
  useVipPrice: boolean
  drawTime: number
  category1: number
  pubTime: number
  category2: number
  brandName: string
  suggestWord: string
  alterStock: number
  couponLabelDesc: any
  coverUrl: string
  coverIdStr: string
  performanceTime: number
  iap: boolean
  picIds: string[]
  status: number
  tags: string[]
  display: number
  createTime: number
  name: string
  id: number
  type: number
  minPrice: number
  originalCost: number
  maxPrice: number
}