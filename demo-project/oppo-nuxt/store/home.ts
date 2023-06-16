import type { HomeInfoType } from '@/types/home';
import type { INavbar, IBanner, ICategory } from '@/types/home';
import { defineStore } from 'pinia';
import { getHomeInfo } from '@/service/home';

interface IHomeState {
  navbars: INavbar[]
  banners: IBanner[]
  categorys: ICategory[]
}

export const useHomeStore =defineStore('home', {
  state: () : IHomeState => ({
    navbars: [],
    banners: [],
    categorys: []
  }),
  actions: {
    async fetchHomeInfoData(type: HomeInfoType) {
      // 服务端发送网络请求，获取数据，会同步给客户端。客户端不发送网络请求。
      const { data } = await getHomeInfo(type)
      this.navbars = data.value.data.navbars || []
      this.banners = data.value.data.banners || []
      this.categorys = data.value.data.categorys || []
    }
  }
})
