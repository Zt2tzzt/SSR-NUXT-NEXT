export type IDetailProductType = 'oppo' | 'air' | 'watch' | 'tablet'

export interface IDetailData {
  id: number
  title: string
  productDetailss: IProductDetailss[]
  link?: string
}

export interface IProductDetailss {
  id: string
  skuId: number
  title: string
  secondTitle: string
  thirdTitle: string
  url: string
  jsonUrl: string
  video: string
  seq: number
  configKeyLattice: number
  latticeIndex: number
  configProductType: number
  goodsSpuId: number
  goodsSpuName: string
  isShowIcon: number
  topIcon: string
  cardType: number
  backColor: string
  liveInfoJson: any
  businessInfoJson: any
  priceInfo: IPriceInfo
  price: number
  originalPrice?: number
  categoryId: number
  link?: string
  isLogin?: number
  marketPrice: string
  nameLabel: any
  imageLabel: any
  extendList: any
  heytapInfo: any
  activityList: IActivityList[]
  placeholderLabel?: IPlaceholderLabel
  vipDiscounts: any
  nameLabelWidth: any
  nameLabelHeight: any
  pricePrefix?: string
  priceSuffix: any
  goodsTopCategoryId: number
  goodsTopCategoryName: string
  goodsCategoryId: number
  goodsCategoryName: string
  skuName: string
  cardInfoType: any
  liveUrl: any
  storage: any
  seckill: any
  rankInfo: any
  businessLink: string
  sellPoints: any
  commentCount: any
  commentRate: any
  interenve: boolean
  productDetailLabelss: any[]
}

export interface IPriceInfo {
  originalPrice: string
  price: string
  marketPrice: string
  buyPrice: string
  prefix: string
  suffix: string
  currencyTag: string
}

export interface IActivityList {
  type: number
  activityInfo: string
}

export interface IPlaceholderLabel {
  type: number
  activityInfo: string
}
