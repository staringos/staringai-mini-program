import { Component, PropsWithChildren } from 'react'
import { View, Text } from '@tarojs/components'

import "taro-ui/dist/style/components/input.scss";
import "taro-ui/dist/style/components/icon.scss";
import "taro-ui/dist/style/components/button.scss" // 按需引入
import './index.less'
import MessageListView from '../../components/MessageListView';
import MessageInput from '../../components/MessageInput';

export default class Index extends Component<PropsWithChildren> {
  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='container'>
        <MessageListView />
        <MessageInput />
      </View>
    )
  }
}
