export default defineNuxtPlugin((nuxtApp) => {
  return {
    provide: {
      // 自定义插件，格式化价格，在创建 vue 实例时，就会注册好。
      formatPrice: (price: number) => {
        return price.toFixed(2)
      }
    }
  }
})