import { ScrollView, View } from "@tarojs/components"
import Message from "../Message"
import styles from './style.module.less'
import Store from '../../store'
import { useEffect, useRef, useState } from "react"

interface IProps {
  conversationId: string | undefined
}

const MessageListView = ({conversationId}: IProps) => {
  const scrollViewRef = useRef<any>(null)
  const {state, actions} = Store.useContainer()
  const [curConv, setCurConv] = useState(state.conversationList[conversationId as string] || {messages: []})
  const lastMessage = curConv?.messages?.[curConv?.messages?.length - 1]

  const init = async () => {
    if (!conversationId) return
    await actions.getConversation(conversationId)
  }

  useEffect(() => {
    init()
  }, [conversationId])

  useEffect(() => {
    setCurConv(state.conversationList[conversationId as string] || {messages: []})
  }, [state.conversationList])

  return (<ScrollView
    ref={scrollViewRef} 
    className={styles.messageListWrapper}
    scrollWithAnimation
    scrollY
    scrollIntoView={`m${lastMessage?.messageId}`}
  >
    <View className={styles.messageListContainer}>
      {curConv?.messages.map(cur => {
        return <Message message={cur} />
      })}
    </View>
  </ScrollView>)
}

export default MessageListView