export interface Data {
  adsInfo: AdsInfo
  menuInfo: MenuInfo
}

export interface AdsInfo {
  slide_ads: SlideAds
  top_ads: any[]
  block: Block[]
  show_index: string
}

export interface SlideAds {
  config: Config
}

export interface Config {
  slide: Slide[]
}

export interface Slide {
  id: string
  size: string
  x_record: string
  zyid: string
  activityname: string
  server_jsonstr: string
  pic: string
  jump_url: string
  zg_event: string
  zg_json: string
}

export interface Block {
  block_id: string
  multi_block: MultiBlock[]
  block_background_color: string
  block_background_image: string
}

export interface MultiBlock {
  show_type: string
  width: string
  margin_enabled: string
  data: Daum[]
  split_line: string
  split_color: string
  height: string
  block_type: string
}

export interface Daum {
  cell: string
  height: string
  width: string
  child: Child[]
}

export interface Child {
  cell: string
  background: string
  width: string
  height: string
  pic: string
  url: string
  countdown: Countdown
  bd_id: string
  new_product: any[]
  x_record: string
  activityname: string
  server_jsonstr: string
  zg_event: string
  zg_json: string
}

export interface Countdown {
  enable_time: string
  start_time: string
  end_time: string
  start_text: string
  end_text: string
}

export interface MenuInfo {
  app_menu: AppMenu
  pre_app_menu: PreAppMenu
  full_ads: any[]
  sidebar_ads: any[]
  pull_ads: any[]
  dynamic_url_list: DynamicUrlList
  time_line: TimeLine[]
  preload_list: PreloadList
  hot_zip: HotZip
}

export interface AppMenu {
  menulist: Menulist[]
  bottom_bg_pic: string
  version: string
  server_jsonstr: string
}

export interface Menulist {
  title: string
  item: string
  type: string
  show_type: string
  act_icon: string
  bg_icon: string
  act_color: string
  color: string
  act_bg_color: string
  bg_color: string
  top_icon: string
  top_text_color: string
  cid: string
  sel_type: string
  is_top_sub: string
  right_location: RightLocation
  left_location: LeftLocation
  search_logo: string
  use_keyword: string
  menu_bg_color?: string
  cursor_color?: string
  top_bg_color?: string
  top_text: string
  wh_ratio: string
  catname: string
  style?: string
  link: string
  hide_ads: string
  search_info: SearchInfo
  seldefault: string
  no_tab_data: string
  click_name: string
  subtab: Subtab[]
  zg_event?: string
  zg_json?: string
}

export interface RightLocation {
  item: string
  pic: string
  url: string
  zg_event: string
  zg_json: string
}

export interface LeftLocation {
  item: string
  pic: string
  url: string
}

export interface SearchInfo {
  open: string
  keyword?: string
  text_color?: string
  use_keyword?: string
  search_logo?: string
  search_bg_color?: string
  jump_url?: string
}

export interface Subtab {
  title: string
  item: string
  type: string
  show_type: string
  act_icon: string
  bg_icon: string
  act_color: string
  color: string
  act_bg_color: string
  bg_color: string
  cid: string
  sel_type: string
  wh_ratio: string
  catname: string
  style?: string
  link: string
  hide_ads: string
  search_info: SearchInfo2
  child_tab?: ChildTab[]
  seldefault: string
  top_icon?: string
  top_text_color?: string
  is_top_sub?: string
  right_location?: RightLocation2
  left_location?: LeftLocation2
  search_logo?: string
  use_keyword?: string
  menu_bg_color?: string
  cursor_color?: string
  top_bg_color?: string
  top_text?: string
}

export interface SearchInfo2 {
  open: string
}

export interface ChildTab {
  title: string
  type: string
  item: string
  link: string
}

export interface RightLocation2 {
  item: string
  pic: string
  url: string
  zg_event: string
  zg_json: string
}

export interface LeftLocation2 {
  item: string
  pic: string
  url: string
}

export interface PreAppMenu {
  menulist: Menulist2[]
  bottom_bg_pic: string
  version: string
}

export interface Menulist2 {
  title: string
  item: string
  type: string
  show_type: string
  act_icon: string
  bg_icon: string
  act_color: string
  color: string
  act_bg_color: string
  bg_color: string
  top_icon: string
  top_text_color: string
  cid: string
  sel_type: string
  is_top_sub: string
  right_location: RightLocation3
  left_location: LeftLocation3
  search_logo: string
  use_keyword: string
  menu_bg_color?: string
  cursor_color?: string
  top_bg_color?: string
  top_text: string
  wh_ratio: string
  catname: string
  style?: string
  link: string
  hide_ads: string
  search_info: SearchInfo3
  seldefault: string
  no_tab_data: string
  click_name: string
  subtab: Subtab2[]
  zg_event?: string
  zg_json?: string
}

export interface RightLocation3 {
  item: string
  pic: string
  url: string
  zg_event: string
  zg_json: string
}

export interface LeftLocation3 {
  item: string
  pic: string
  url: string
}

export interface SearchInfo3 {
  open: string
  keyword?: string
  text_color?: string
  use_keyword?: string
  search_logo?: string
  search_bg_color?: string
  jump_url?: string
}

export interface Subtab2 {
  title: string
  item: string
  type: string
  show_type: string
  act_icon: string
  bg_icon: string
  act_color: string
  color: string
  act_bg_color: string
  bg_color: string
  cid: string
  sel_type: string
  wh_ratio: string
  catname: string
  style?: string
  link: string
  hide_ads: string
  search_info: SearchInfo4
  child_tab?: ChildTab2[]
  seldefault: string
  top_icon?: string
  top_text_color?: string
  is_top_sub?: string
  right_location?: RightLocation4
  left_location?: LeftLocation4
  search_logo?: string
  use_keyword?: string
  menu_bg_color?: string
  cursor_color?: string
  top_bg_color?: string
  top_text?: string
}

export interface SearchInfo4 {
  open: string
}

export interface ChildTab2 {
  title: string
  type: string
  item: string
  link: string
}

export interface RightLocation4 {
  item: string
  pic: string
  url: string
  zg_event: string
  zg_json: string
}

export interface LeftLocation4 {
  item: string
  pic: string
  url: string
}

export interface DynamicUrlList {
  qimimapi_goods_pinpai_goods: string
  qimimapi_goods_pop_detail: string
  qimimapi_goods_discount_detail: string
  qimimapi_goods_cps_detail: string
  qimimapi_goods_search: string
  qimimapi_goods_spo_search: string
  qimimapi_goods_search_keywords: string
  qimimapi_goods_search_suggest: string
  qimimapi_goods_pinpai_list: string
  qimimapi_goods_pop_sku: string
  qimimapi_goods_getSaleActivityInfo: string
  qimimapi_goodsimg_get_list: string
  qimimapi_goods_detail_imgshow: string
  qimimapi_goodsintro_flow_block: string
  qimimapi_goods_detail_question: string
  qimimapi_goodsintro_recommendations: string
  qimimapi_goodsintro_detail_goods: string
  qimimapi_goods_remind_detail: string
  qimimapi_goods_detail_fsinfo: string
  qimimapi_appads_popup: string
  qimimapi_appads_banner: string
  qimimapi_appads_moduleads: string
  qimimapi_appads_ads: string
  qimimapi_coupons_get_list: string
  qimimapi_coupons_add: string
  qimimapi_timebuy_xrlist: string
  qimimapi_category_main_list: string
  qimimapi_usertype_get_abinfo: string
  qimiapi_setting_seed: string
  qimiapi_setting_leaf: string
  qimituan_ptitem_detail: string
  qimituan_ptitem_goods_list: string
  qimituan_ptgoods_getCouponList: string
  qimituan_ptgoods_receive: string
  qimimapi_goods_store_goods: string
  "qimidetail-api_ptgoods_detail": string
  "qimidetail-api_ptgoods_sku": string
  "qimidetail-api_ptgoods_buybtn": string
  "qimidetail-api_ptgoods_guess_like": string
  "qimidetail-api_ptgoods_valuation": string
  qimisku: string
}

export interface TimeLine {
  s_time: string
  e_time: string
  tl_val: string
}

export interface PreloadList {
  s_time: string
  e_time: string
  url_list: string[]
}

export interface HotZip {
  vip_pull_new: VipPullNew
  hongbaoyu: Hongbaoyu
  dazhuanpan: Dazhuanpan
  paysendcoupon: Paysendcoupon
  signred: Signred
  fanpai: Fanpai
  coupon717: Coupon717
  jpindexpopup: Jpindexpopup
  searchcoupon: Searchcoupon
  signguide: Signguide
}

export interface VipPullNew {
  ver: string
  url: string
}

export interface Hongbaoyu {
  ver: string
  url: string
}

export interface Dazhuanpan {
  ver: string
  url: string
}

export interface Paysendcoupon {
  ver: string
  url: string
}

export interface Signred {
  ver: string
  url: string
}

export interface Fanpai {
  ver: string
  url: string
}

export interface Coupon717 {
  ver: string
  url: string
}

export interface Jpindexpopup {
  ver: string
  url: string
}

export interface Searchcoupon {
  ver: string
  url: string
}

export interface Signguide {
  ver: string
  url: string
}