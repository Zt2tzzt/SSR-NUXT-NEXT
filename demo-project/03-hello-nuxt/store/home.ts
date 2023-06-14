import { defineStore } from 'pinia'

interface IState {
  count: number,
  homeInfo: any
}
export const useHomeStore = defineStore('home', {
  state: (): IState => ({
    count: 0,
    homeInfo: {}
  }),
  actions: {
    increment() {
      this.count++
    },
    async fetchHomeData() {
      const url = 'http://codercba.com:9060/juanpi/api/homeinfo'
      const { data } = await useFetch<any>(url)
      console.log('data.value.data:', data.value.data)
      this.homeInfo = data.value.data
    }
  }
})
