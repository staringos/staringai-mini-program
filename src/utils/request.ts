import Taro from "@tarojs/taro"
import { baseUrl, mtbirdUrl } from "./config"
import { STORAGE_ACCESS_TOKEN } from "./constants"

const basicRequest = (url, method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET', data?: Record<string, any>, apiBaseUrl = baseUrl) => {
  return Taro.request({
    url: `${apiBaseUrl}${url}`,
    method,
    dataType: 'json',
    data,
    header: {
      Authorization: `Beare ${Taro.getStorageSync(STORAGE_ACCESS_TOKEN)}`
    }
  })
}

const requestGenerate = (apiBaseUrl: string = baseUrl) => ({
  get: (url, data?) => basicRequest(url, 'GET', data, apiBaseUrl),
  post: (url, data?) => basicRequest(url, 'POST', data, apiBaseUrl),
  delete: (url, data?) => basicRequest(url, 'DELETE', data, apiBaseUrl),
  put: (url, data?) => basicRequest(url, 'PUT', data, apiBaseUrl),
})

export const mtbirdRequest = requestGenerate(mtbirdUrl)
export default requestGenerate()