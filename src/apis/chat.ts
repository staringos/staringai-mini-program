import { IMessage } from "../types/message";
import request from '../utils/request';

export const sendMessage = (message: IMessage) => {
  return request.get(`/chat`, {
    ...message,
    msg: message.content
  })
}