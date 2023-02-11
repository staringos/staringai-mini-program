import { Component, PropsWithChildren } from 'react'
import { View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro';

import "taro-ui/dist/style/components/input.scss";
import "taro-ui/dist/style/components/icon.scss";
import "taro-ui/dist/style/components/button.scss" // 按需引入
import './index.less'
import MessageListView from '../../components/MessageListView';
import MessageInput from '../../components/MessageInput';

interface IState {
  conversationId: string | undefined,
  isShare: boolean | undefined
}

export default class Index extends Component<PropsWithChildren, IState> {
  constructor(props) {
    super(props)
    this.state = {
      conversationId: undefined,
      isShare: undefined
    }
  }
  
  componentDidMount () {
    const params = Taro.Current.router?.params
    console.log('params:', params) // 页面参数获取

    this.setState({
      conversationId: params?.id,
      isShare: !!params?.isShare
    })
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  onShareAppMessage = (res) => {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '与 ChatGPT 的聊天记录 - 星搭小星',
      path: `/pages/chat/index?id=${this.state.conversationId}&isShare=true`
    }
  }

  onShareTimeline = () => {
    let shareData = {
      title: '与 ChatGPT 的聊天记录 - 星搭小星',
      path: `/pages/chat/index?id=${this.state.conversationId}&isShare=true`,  // 分享的路径
      imageUrl: 'https://mtbird-cdn.staringos.com/product/images/share.jpg'  // 分享的图片链接
    }
    return shareData;
  }

  render () {
    const { conversationId, isShare } = this.state

    console.log("conversationId:", conversationId)

    return (
      <View className='container'>
        <MessageListView conversationId={conversationId} isShare={!!isShare} />
        <MessageInput conversationId={conversationId as string} isShare={!!isShare} />
      </View>
    )
  }
}
