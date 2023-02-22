import Taro from "@tarojs/taro"
import { baseUrl } from "./config"
import { STORAGE_ACCESS_TOKEN } from "./constants"

const basicRequest = (url, method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET', data?: Record<string, any>) => {
  return Taro.request({
    url: `${baseUrl}${url}`,
    method,
    dataType: 'json',
    data,
    header: {
      Authorization: `Beare ${Taro.getStorageSync(STORAGE_ACCESS_TOKEN)}`
    }
  })
}

export default {
  get: (url, data?) => basicRequest(url, 'GET', data),
  post: (url, data?) => basicRequest(url, 'POST', data),
  delete: (url, data?) => basicRequest(url, 'DELETE', data),
  put: (url, data?) => basicRequest(url, 'PUT', data),
}