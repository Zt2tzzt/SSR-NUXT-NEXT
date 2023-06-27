import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { ZTInternalRequestInterceptor, ZTInternalRequestConfig, ZTRequestConfig } from './type'


class ZTRequest {
  instance: AxiosInstance
  interceptors?: ZTInternalRequestInterceptor

  constructor(config: ZTInternalRequestConfig) {
    // 创建axios实例
    this.instance = axios.create(config)

    // 保存基本信息
    this.interceptors = config.interceptor

    // 使用拦截器（单个实例拦截器）
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )

    // 使用拦截器（全局拦截器）
    this.instance.interceptors.request.use(
      config => {
        // console.log('全局拦截，请求成功')
        return config
      },
      err => {
        // console.log('全局拦截，请求失败')
        return err
      }
    )
    this.instance.interceptors.response.use(
      res => {
        // console.log('全局拦截，响应成功')
        const data = res.data
        return data
      },
      err => {
        // console.log('全局拦截，响应失败')
        return err
      }
    )
  }

  // 封装request方法
  request<T>(config: ZTRequestConfig<T>): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      // 1.单个请求对请求config的处理
      if (config.interceptor?.requestInterceptor) {
        config = config.interceptor.requestInterceptor(config)
      }

      this.instance
        .request<unknown, T>(config)
        // then方法中res，是经过全局拦截器处理后的数据，仅保留了data，所以类型不是AxiosResponse，所以在type中，responseInterceptor类型要调整。
        .then(res => {
          // 单个请求对数据的处理
          if (config.interceptor?.responseInterceptor) {
            res = config.interceptor.responseInterceptor(res)
          }
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  }

  get<T>(config: ZTRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }
  post<T>(config: ZTRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }
  delete<T>(config: ZTRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }
  patch<T>(config: ZTRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
}

export default ZTRequest
