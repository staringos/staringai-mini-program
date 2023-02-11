import { Text, View } from '@tarojs/components'
import 'taro-ui/dist/style/components/avatar.scss'
import { IMessage } from 'src/types/message'
import { AtAvatar } from 'taro-ui'
import styles from './style.module.less'

interface IProps {
  message: IMessage
}


const Message = ({ message }: IProps) => {
  return (
    <View id={`m${message.messageId}`} className={styles.messageWrapper + ' ' + styles[message.from]}>
      <AtAvatar className={styles.messageAvatar} image={message.from === 'them' ? 'https://mtbird-cdn.staringos.com/product/images/staringai-logo.png' : message.avatar} openData={message.from === 'them' ? {} : { type: 'userAvatarUrl'}} circle size='small' />
      <View className={styles.messageContentWrapper}>
        <View className={styles.messageContent}>
          <Text>{message.content}</Text>
        </View>
      </View>
    </View>
  )
}

export default Message