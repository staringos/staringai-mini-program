import { AtButton, AtToast } from 'taro-ui'
import { useState } from 'react'
import { Textarea, View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import 'taro-ui/dist/style/components/button.scss'
import 'taro-ui/dist/style/components/loading.scss'
import 'taro-ui/dist/style/components/input.scss'
import 'taro-ui/dist/style/components/icon.scss'
import 'taro-ui/dist/style/components/form.scss'
import 'taro-ui/dist/style/components/toast.scss'

import styles from './style.module.less'
import {useStore} from '../../store'
import { observer } from 'mobx-react-lite'

interface IProps {
  conversationId: string
  isShare: boolean
}

const MessageInput = observer(({conversationId, isShare}: IProps) => {
  const { sendMessage, conversation } = useStore()
  const [msg, setMsg] = useState('')
  const [isOpened, setIsOpened] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (val: any) => {
    setMsg(val.detail.value)
  }

  const handleSend = async () => {
    if (!msg || msg.trim().length === 0) {
      setIsOpened(true)
      return
    }

    const conv = conversation

    setIsLoading(true)
    try {
      await sendMessage('me', msg, conversationId, conv?.messages?.[conv?.messages?.length - 1]?.messageId || '')
      setMsg('')
    } catch(e) {
      console.log("[handleSend] e:", e)
    } finally {
      setIsLoading(false)
    }
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
      <Textarea
        className={styles.messageInput}
        placeholderClass={styles.messageInputPlaceholder}
        name=''
        placeholder='请输入消息'
        value={msg}
        onInput={handleInputChange}
        onConfirm={handleSend}
        maxlength={3000}
        cursorSpacing={140}
        showConfirmBar={false}
        disabled={isLoading}
      >
      </Textarea>
      <AtButton className={styles.messageSendButton} type='primary' onClick={handleSend} disabled={isLoading}>发送</AtButton>
    </View>
  )
})

export default MessageInput