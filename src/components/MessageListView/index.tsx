import { ScrollView, View } from "@tarojs/components"
import Message from "../Message"
import styles from './style.module.less'
import {useStore} from '../../store'
import { useEffect, useRef } from "react"
import { IConversation } from "@/types/message"
import { observer } from "mobx-react-lite"

interface IProps {
  conversationId: string | undefined;
  isShare: boolean;
}

const MessageListView = observer(({conversationId, isShare}: IProps) => {
  const scrollViewRef = useRef<any>(null)
  const {conversation, getConversation} = useStore()
  const curConv = conversation as IConversation

  const init = async () => {
    if (!conversationId) return
    await getConversation(conversationId, isShare)
  }

  useEffect(() => {
    init()
  }, [conversationId])

  const lastMessage = curConv?.messages?.[curConv?.messages?.length - 1]

  return (<ScrollView
    ref={scrollViewRef} 
    className={styles.messageListWrapper}
    scrollWithAnimation
    scrollY
    scrollIntoView={`m${lastMessage?.messageId}`}
  >
    <View className={styles.messageListContainer}>
      {curConv?.messages.map((cur, i) => {
        return <Message message={cur} isShare={isShare} key={i} />
      })}
    </View>
  </ScrollView>)
})

export default MessageListView