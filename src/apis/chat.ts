import Taro from '@tarojs/taro'
import { IMessage } from "src/types/message";

const baseUrl = 'https://ai.staringos.com/api'

export const sendMessage = (message: IMessage) => {
  return Taro.request({
    url: `${baseUrl}/chat`,
    dataType: 'json',
    method: 'GET',
    data: {
      ...message,
      msg: message.content
    }
  })
}