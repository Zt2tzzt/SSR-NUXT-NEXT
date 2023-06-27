import ZTRequest from './request'

const BASE_URL = 'http://codercba.com:9060/juanpi/api'
const TIME_OUT = 60000 // 一分钟

const ztRequest = new ZTRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptor: {
    requestInterceptor(config) {
      // console.log('单例拦截，请求成功')
      return config
    },
    requestInterceptorCatch(err) {
      // console.log('单例拦截，请求失败')
      return err
    },
    responseInterceptor(res) {
      // console.log('单例拦截，响应成功')
      return res
    },
    responseInterceptorCatch(err) {
      // console.log('单例拦截，响应失败')
      return err
    }
  }
})

export default ztRequest
