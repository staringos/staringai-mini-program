import Taro from '@tarojs/taro'
import { IMessage } from 'src/types/message'

const baseUrl = 'https://ai.staringos.com/api'
// const baseUrl = 'http://localhost:3000/api'

export const getConversation = (id: string) => {
  return Taro.request({
    url: `${baseUrl}/conversation`,
    dataType: 'json',
    method: 'GET',
    data: {
      id
    }
  })
}

export const syncConversation = (id: string, messages: IMessage[]) => {
  return Taro.request({
    url: `${baseUrl}/conversation`,
    dataType: 'json',
    method: 'POST',
    data: {
      id, messages
    }
  })
}