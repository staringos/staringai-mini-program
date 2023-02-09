import { View } from "@tarojs/components"
import { useState } from "react"
import { IMessage } from "src/types/message"
import data from '../../mocks/data.json'
import Message from "../Message"
import styles from './style.module.less'

const MessageListView = () => {
  const [list, setList] = useState<IMessage[]>(data.msgList as any)

  return (<View className={styles.messageListWrapper}>
    {list.map(cur => {
      return <Message message={cur} />
    })}
  </View>)
}

export default MessageListView