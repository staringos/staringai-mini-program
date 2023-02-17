import { useState } from "react"
import Taro from '@tarojs/taro'
import { sendMessage } from "../apis/chat"
import { IConversation, IMessage } from "../types/message"
import { createContainer } from "../hooks/useContainer"
import { randomNum } from "../utils"
import { getConversation, syncConversation } from "../apis/conversation"

const STORED_KEY = 'CONVERSATION_STORED_KEY'

export default createContainer(() => {
  let storage = Taro.getStorageSync(STORED_KEY)

  if (storage) {
    try {
      storage = JSON.parse(storage)
    } catch(e) {
      storage = undefined
    }
  }

  const [conversationList, setConversationList] = useState<Record<string, IConversation>>((storage as any) || {})
  const [user, setUser] = useState({
    avatar: 'https://mtbird-cdn.staringos.com/0010141761616-1311114-413141-113126-157101512171315151100.jpeg',
    nickName: ''
  })

  return {
    state: {
      conversationList
    },
    actions: {
      async getConversation(id: string, isShare: boolean) {
        Taro.showLoading({ title: "加载中..."})
        const conv = await getConversation(id)
        if (!isShare && conv.data?.data && conv.data?.data?.id === id) {
          conversationList[id] = conv.data.data
          setConversationList({...conversationList})
        }
        Taro.hideLoading()

        return conv.data?.data
      },
      async newConversation() {
        const id = randomNum(10)
        conversationList[id] = {
          id,
          messages: []
        }

        return id
      },
      async sendMessage(from: 'me' | 'them', content: string, conversationId: string, parentMessageId: string) {
        const msg = {
          messageId: randomNum(10),
          parentMessageId,
          content,
          from,
          avatar: from === 'me' ? user.avatar : '',
          nickName: from === 'me' ? user.nickName : '小星',
        } as IMessage

        if (conversationId) {
          msg.conversationId = conversationId
        }

        // push 我的消息
        const curConv = conversationList[msg.conversationId]
        curConv.messages.push(msg)
        setConversationList({...conversationList})

        Taro.showLoading({ title: "加载中..."})
        const res = (await sendMessage(msg)).data as any
        Taro.hideLoading()
        
        // {"role":"assistant","id":"cmpl-6iJDQ9cEsp52WIzEKa4qTjsCeuRU0","parentMessageId":"4a86e84b-abdc-4262-8050-e0d065b35b9d","conversationId":"undefined","text":"246"}
        const msgThem = {
          from: 'them',
          content: res.text,
          messageId: res.id,
          conversationId: res.conversationId,
          nickName: '小星',
          avatar: 'https://mtbird-cdn.staringos.com/product/images/staringai-logo.png',
          parentMessageId: res.parentMessageId,
        } as IMessage

        // push 回复
        curConv.messages.push(msgThem)

        console.log("conversationList res:", res)
        
        setConversationList({...conversationList})
        Taro.setStorage({
          key: STORED_KEY,
          data: JSON.stringify(conversationList)
        })

        syncConversation(conversationId, curConv.messages)
      }
    }
  }
})