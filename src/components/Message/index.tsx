import { Text, View, OpenData } from '@tarojs/components'
import 'taro-ui/dist/style/components/avatar.scss'
import { IMessage } from 'src/types/message'
import { AtAvatar } from 'taro-ui'
import styles from './style.module.less'

interface IProps {
  message: IMessage;
  isShare: boolean;
}


const Message = ({ message, isShare }: IProps) => {
  return (
    <View id={`m${message.messageId}`} className={styles.messageWrapper + ' ' + styles[message.from]}>
      {isShare ? (<AtAvatar className={styles.messageAvatar} image={message.from === 'them' ? 'https://mtbird-cdn.staringos.com/product/images/chatgpt.png' : message.avatar} circle size='small' />) : <AtAvatar className={styles.messageAvatar} image={message.from === 'them' ? 'https://mtbird-cdn.staringos.com/product/images/chatgpt.png' : message.avatar} openData={message.from === 'them' ? {} : { type: 'userAvatarUrl'}} circle size='small' />}
      <View className={styles.messageRight}>
        {!isShare && (message.from === 'them' ? <Text className={styles.messageNickname}>ChatGPT</Text> : <OpenData className={styles.messageNickname + ' ' + styles.right} type='userNickName' />)}
        <View className={styles.messageContentWrapper}>
          <View className={styles.messageContent}>
            <Text>{message.content}</Text>
          </View>
        </View>
      </View>
      <OpenData type='userAvatarUrl' style={{display: 'none'}} />
    </View>
  )
}

export default Message