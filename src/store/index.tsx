import React, { createContext, useContext } from "react"
import Taro from '@tarojs/taro'
import { makeAutoObservable } from "mobx";
import { STORAGE_ACCESS_TOKEN } from "@/utils/constants"
import { sendMessage } from "../apis/chat"
import { IConversation, IMessage } from "../types/message"
import { randomNum, weixinLogin } from "../utils"
import { getConversation, getConversationList, syncConversation } from "../apis/conversation"
import { IUser } from "../types/auth"

class Store {
  constructor() {
    makeAutoObservable(this);
  }

  conversationList: Record<string, IConversation> = {}
  conversation: IConversation | null = null
  user: IUser | null = null

  login = async () => {
    const { data } = await weixinLogin() as any
    const {user, token} = data.data
  
    Taro.setStorageSync(STORAGE_ACCESS_TOKEN, token)
    this.user = user
    return user
  }

  getConversationList = async () => {
    Taro.showLoading({ title: "加载中..."})
    // check login
    if (!this.user) await this.login()
    const {data} = await getConversationList()
    this.conversationList = data.data
    Taro.hideLoading()
    return data?.data
  }

  getConversation = async (id: string, isShare: boolean) => {
    // check login
    // if (!this.user) await this.login()

    Taro.showLoading({ title: "加载中..."})
    const { data } = await getConversation(id)

    if (data?.data && data?.data?.id === id) {
      this.conversation = data.data
    }
    Taro.hideLoading()
    return data?.data
  }

  newConversation = async () => {
    Taro.showLoading({ title: "加载中..."})
    try {
      // check login
      if (!this.user) await this.login()

      const id = randomNum(10)
      await syncConversation(id, [], this.user?.id)
      return id
    } finally {
      Taro.hideLoading()
    }
  }

  sendMessage = async (from: 'me' | 'them', content: string, conversationId: string, parentMessageId: string) => {
    const curConv = this.conversation
    if(!curConv) return

    Taro.showLoading({ title: "加载中..."})

    try {
      // check login
      if (!this.user) await this.login()

      // create message
      const msg = {
        messageId: randomNum(10),
        parentMessageId,
        content,
        from,
        avatar: from === 'me' ? this.user?.avatar : '',
        nickName: from === 'me' ? this.user?.nickName : '小星',
      } as IMessage

      if (conversationId) {
        msg.conversationId = conversationId
      }

      curConv.messages.push(msg)
      this.conversation = curConv

      // send message
      const res = (await sendMessage(msg)).data as any  

      if (res.code === 40012) {
        Taro.showToast({
          title: '不要发敏感词～',
          icon: 'error',
        })
        curConv.messages.pop()
        return
      }
    
      // create robot respose message
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
    } finally {
      Taro.hideLoading()
    }

    syncConversation(conversationId, curConv.messages, this.user?.id)
  }
}


const StoreContext = createContext<Store>(new Store)

const StoreProvider: React.FC<{ store: Store, children: any }> = ({store, children}: any) => (
  <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
)

const useStore = () => {
  return useContext(StoreContext)
}

export {Store, StoreProvider, useStore}