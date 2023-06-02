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
  }
})
