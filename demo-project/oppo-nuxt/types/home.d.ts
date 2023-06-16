export type HomeInfoType = 'oppo' | 'onePlus' | 'intelligent'


export interface IHomeData {
  navbars: INavbar[]
  banners: IBanner[]
  categorys: ICategory[]
}

export interface INavbar {
  id: string
  title: string
  type: string
  showName: number
  url: string
  jsonUrl: string
  clickUrl: string
  jsonClickUrl: string
  beginAt: any
  endAt: any
  seq: number
  labelDetailss: any[]
  link: string
  isLogin: number
  moduleCode: string
  rows: number
  cols: number
  maxProductNum: number
}

export interface IBanner {
  id: number
  picStr: string
  link: string
}

export interface ICategory {
  id: number
  picStr: string
  title: string
  type: string
  url: string
  moduleCode: string
  productDetailss: IProductDetailss[]
  link: string
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
  buyPrice?: string
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