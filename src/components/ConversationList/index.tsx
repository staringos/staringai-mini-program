import {View} from '@tarojs/components'
import {AtList, AtListItem, AtButton} from 'taro-ui'
import Taro from '@tarojs/taro'
import values from 'lodash/values'

import 'taro-ui/dist/style/components/list.scss'
import 'taro-ui/dist/style/components/icon.scss'
import 'taro-ui/dist/style/components/button.scss'
import 'taro-ui/dist/style/components/loading.scss'

import styles from './style.module.less'
import Store from '../../store'
import { useEffect, useState } from 'react'
import { IConversation } from 'src/types/message'

const ConversationList = () => {
  const { state, actions } = Store.useContainer()
  const [convList, setConvList] = useState<IConversation[]>([])

  const init = () => {
    setConvList(state.conversationList as any)
  }

  useEffect(() => init(), [state.conversationList])

  const handleClick = (id: string | undefined) => {
    Taro.navigateTo({
      url: `/pages/chat/index?id=${id}`
    })
  }

  const handleNewClick = async () => {
    const id = await actions.newConversation()
    handleClick(id)
  }

  // console.log("state.conversationList:", state.conversationList, values(state.conversationList))

  return (
    <View>
      <AtButton className={styles.mainButton} onClick={handleNewClick} type='primary'>创建新会话</AtButton>
      <AtList>
        {values(convList).map(cur => {
          return <AtListItem title={cur.messages[0]?.content} onClick={() => handleClick(cur.id)} key={cur.id} />
        })}
      </AtList>
    </View>
  )
}

export default ConversationList