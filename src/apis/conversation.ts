import request from '../utils/request'
import { IMessage } from '../types/message'

export const getConversation = (id: string) => {
  return request.get('/conversation', {
    id
  })
}

export const syncConversation = (id: string, messages: IMessage[], userId) => {
  return request.post('/conversation', {
    id, messages, userId
  })
}

// get conversation list
export const getConversationList = () => {
  return request.get('/user/conversations')
}