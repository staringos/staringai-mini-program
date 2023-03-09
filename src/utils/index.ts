import Taro from '@tarojs/taro'
import { aiThirdLogin, getThirdToken, sendWxCode } from '../apis/user';
import { appId, loginType } from './config';

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
          const extConfig: any = await Taro.getExtConfig()
          console.log("extConfig:", extConfig)
          const ext = extConfig.extConfig
          
          if (loginType === 'independence') {
            const result = await sendWxCode(res.code)
            resolve(result)
          } else {
            const {data}: any = await getThirdToken(res.code, ext?.appId || appId, ext?.mtbirdAppId || '')
            const result = await aiThirdLogin(data.data.thirdToken)

            resolve(result)
          }
        } else {
          reject(res)
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  })
}