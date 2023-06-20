export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['normalize.css', '~/assets/css/global.scss', '~/assets/css/cus-font/iconfont.css'],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/css/variables.scss" as *;'
        }
      }
    }
  },
  app: {
    // 可以给所有的页面的head添加一下SEO的信息
    head: {
      title: '弘源OPPO手机商城',
      meta: [
        {
          name: 'description',
          content: 'OPPO专区，官方正品，最新最全的OPPO手机产品以及配件在线抢购！'
        },
        {
          name: 'keywords',
          content: 'OPPO商城，OPPO专区, OPPO手机，OPPO配件，OPPO, OPPO官网商城'
        },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
      noscript: [{ children: 'Javascript is required' }]
    }
  },
  modules: ['@pinia/nuxt', '@element-plus/nuxt']
})
