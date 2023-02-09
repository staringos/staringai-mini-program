import { AtButton, AtInput, AtForm } from 'taro-ui'
import { useState } from 'react'
import 'taro-ui/dist/style/components/button.scss'
import 'taro-ui/dist/style/components/loading.scss'
import 'taro-ui/dist/style/components/input.scss'
import 'taro-ui/dist/style/components/icon.scss'
import 'taro-ui/dist/style/components/form.scss'

import styles from './style.module.less'
import { Input, View } from '@tarojs/components'

const MessageInput = () => {
  const [msg, setMsg] = useState('')

  const handleInputChange = (val: any) => {
    setMsg(val.detail.value)
  }

  const handleSend = () => {

  }

  return (
    <View className={styles.messageInputWrapper}>
      <Input
        className={styles.messageInput}
        name=''
        type='text'
        placeholder='验证码'
        value={msg}
        onInput={handleInputChange}
        onConfirm={handleSend}
      >
      </Input>
      <AtButton className={styles.messageSendButton} onClick={handleSend}>发送</AtButton>
    </View>
  )
}

export default MessageInput