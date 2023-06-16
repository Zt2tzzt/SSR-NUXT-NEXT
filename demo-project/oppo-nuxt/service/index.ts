import type { AsyncData, UseFetchOptions } from 'nuxt/app'

const BASE_URL = 'http://codercba.com:9060/oppo-nuxt/api'
type Method = 'GET' | 'POST'

class ZtRequest {
  request<T = any>(
    url: string,
    method: Method,
    data?: any,
    options?: UseFetchOptions<T>
  ): Promise<AsyncData<T, Error>> {
    return new Promise((resolve, reject) => {
      const newOption: UseFetchOptions<T> = {
        baseURL: BASE_URL,
        method,
        ...options
      }

      if (method === 'GET') {
        newOption.query = data
      } else if (method === 'POST') {
        newOption.body = data
      }

      useFetch<T>(url, newOption as any)
        .then(res => {
          resolve(res as AsyncData<T, Error>)
        })
        .catch(err => {
          reject(err)
        })
    })
  }

  get<T = any>(url: string, param?: any, options?: UseFetchOptions<T>) {
    return this.request(url, 'GET', param, options)
  }

  post<T = any>(url: string, data?: any, options?: UseFetchOptions<T>) {
    return this.request(url, 'POST', data, options)
  }
}

export default new ZtRequest()
