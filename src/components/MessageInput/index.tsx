import { AtButton, AtToast } from 'taro-ui'
import { useState } from 'react'
import { Input, View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import 'taro-ui/dist/style/components/button.scss'
import 'taro-ui/dist/style/components/loading.scss'
import 'taro-ui/dist/style/components/input.scss'
import 'taro-ui/dist/style/components/icon.scss'
import 'taro-ui/dist/style/components/form.scss'
import 'taro-ui/dist/style/components/toast.scss'

import styles from './style.module.less'
import Store from '../../store'

interface IProps {
  conversationId: string
  isShare: boolean
}

const MessageInput = ({conversationId, isShare}: IProps) => {
  const { actions, state } = Store.useContainer()
  const [msg, setMsg] = useState('')
  const [isOpened, setIsOpened] = useState(false)

  const handleInputChange = (val: any) => {
    setMsg(val.detail.value)
  }

  const handleSend = async () => {
    if (!msg || msg.trim().length === 0) {
      setIsOpened(true)
      return
    }

    const conv = state.conversationList[conversationId]

    actions.sendMessage('me', msg, conversationId, conv?.messages?.[conv?.messages?.length - 1]?.messageId || '')
    setMsg('')
  }

  const handleGotoHome = () => {
    Taro.navigateTo({
      url: `/pages/index/index?f=share`
    })
  }

  if (isShare) {
    return (
      <View className={styles.messageInputWrapper}>
        <AtButton className={styles.gotoHomeButton} onClick={handleGotoHome} type='primary'>与 ChatGPT 立即开聊</AtButton>
      </View>
    )
  }

  return (
    <View className={styles.messageInputWrapper}>
      <AtToast isOpened={isOpened} text='消息不能为空' icon='warning' duration={3000}></AtToast>
      {/* <View className={styles.messageInputContainer}>
        
      </View> */}
      <Input
        className={styles.messageInput}
        name=''
        type='text'
        placeholder='请输入消息'
        value={msg}
        onInput={handleInputChange}
        onConfirm={handleSend}
      >
      </Input>
      <AtButton className={styles.messageSendButton} type='primary' onClick={handleSend}>发送</AtButton>
    </View>
  )
}

export default MessageInput