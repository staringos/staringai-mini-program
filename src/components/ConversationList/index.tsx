import {ScrollView, View} from '@tarojs/components'
import {AtList, AtListItem, AtButton} from 'taro-ui'
import Taro, { useDidShow } from '@tarojs/taro'
import values from 'lodash/values'
import { observer } from 'mobx-react-lite'

import 'taro-ui/dist/style/components/list.scss'
import 'taro-ui/dist/style/components/icon.scss'
import 'taro-ui/dist/style/components/button.scss'
import 'taro-ui/dist/style/components/loading.scss'

import styles from './style.module.less'
import {useStore} from '../../store'
import { IConversation } from '../../types/message'

const ConversationList = observer(() => {
  const { conversationList, getConversationList, newConversation } = useStore()

  const init = async () => {
    await getConversationList()
  }

  useDidShow(() => {
    init()
  }, [])

  const handleClick = (id: string | undefined) => {
    Taro.navigateTo({
      url: `/pages/chat/index?id=${id}`
    })
  }

  const handleNewClick = async () => {
    const id = await newConversation()
    handleClick(id)
  }

  return (
    <View className={styles.conversationListWrapper}>
      <AtButton className={styles.mainButton} onClick={handleNewClick} type='primary'>与 ChatGPT 立即开聊</AtButton>
      <ScrollView className={styles.scrollView} scrollY>
        <AtList>
          {values(conversationList).map((cur: IConversation) => {
            return <AtListItem title={cur.messages[0]?.content} onClick={() => handleClick(cur.id)} key={cur.id} />
          })}
        </AtList>
      </ScrollView>
    </View>
  )
})

export default ConversationList