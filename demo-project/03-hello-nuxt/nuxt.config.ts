// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    // 配置属性采用驼峰的形式
    // server 端可访问的配置，会被打包到 server_bundle.js 中
    appKey: 'aabbcc',

    // server、client 端，可访问的配置。会被打包到 server_bundle.js 和 client_bundle.js 中。
    public: {
      baseURL: 'http://codercba.com'
    }
  },
  /* appConfig: {
    title: "Hello Nuxt3 ZZT",
    theme: {
      primary: 'yellow'
    }
  }, */
  app: {
    head: {
      title: 'ZZT',
      charset: 'UTF-8',
      viewport: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no',
      meta: [
        {
          name: 'keywords',
          content: 'ZZT SEO'
        },
        {
          name: 'description',
          content: '手机商城 zzt'
        }
      ],
      link: [
        {
          rel: 'shortcut icon',
          href: 'favicon-ico',
          type: 'image/x-icon'
        }
      ],
      /* style: [
        {
          children: 'body { color: red; }'
        }
      ], */
      script: [
        {
          src: 'http://codercba.com'
        }
      ]
    }
  },
  /* ssr: false,
  router: {
    options: {
      hashMode: true
    }
  } */
  css: [
    '@/assets/styles/main.css',
    '@/assets/styles/main.less',
    '@/assets/iconfont/iconfont.css'
  ]
})
