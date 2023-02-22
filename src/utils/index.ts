import Taro from '@tarojs/taro'
import { sendWxCode } from '../apis/user';

export const getAccessToken = () => {
  return Taro.getStorageSync('at')
}

export function randomNum(n: number) {
  let value = '';
  for (let i = 0; i < n; i++) {
    value += Math.floor(Math.random() * 10);
  }
  return value;
}

export function weixinLogin () {
  return new Promise((resolve, reject) => {
    Taro.login({
      success: async (res: any) => {
        if (res.code) {
          const data = await sendWxCode(res.code)
          console.log("data", data)
          resolve(data)
        } else {
          reject(res)
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  })
}