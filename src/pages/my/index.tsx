import { Component, PropsWithChildren } from 'react'
import { View } from '@tarojs/components'

import "taro-ui/dist/style/components/input.scss";
import "taro-ui/dist/style/components/icon.scss";
import "taro-ui/dist/style/components/button.scss" // 按需引入
import './index.less'
import ConversationList from '../../components/ConversationList';
import TabBar from '../../components/TabBar';

export default class Index extends Component<PropsWithChildren> {
  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='container'>
        <ConversationList />
        <TabBar current={0} />
      </View>
    )
  }
}
