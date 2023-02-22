import { Component, PropsWithChildren } from 'react'
import { View, ScrollView } from '@tarojs/components'
import Taro from '@tarojs/taro';

import "taro-ui/dist/style/components/input.scss";
import "taro-ui/dist/style/components/icon.scss";
import "taro-ui/dist/style/components/button.scss" // 按需引入
import './index.less'
import MessageListView from '../../components/MessageListView';
import MessageInput from '../../components/MessageInput';

interface IState {
  conversationId: string | undefined,
  isShare: boolean | undefined,
  scrollTop: number
}

// export function getWindowHeight(showTabBar = true) {
//   const info = Taro.getSystemInfoSync()
//   const { windowHeight, statusBarHeight, titleBarHeight } = info
//   const tabBarHeight = showTabBar ? TAB_BAR_HEIGHT : 0

//   if (process.env.TARO_ENV === 'rn') {
//     return windowHeight - statusBarHeight - NAVIGATOR_HEIGHT - tabBarHeight
//   }

//   if (process.env.TARO_ENV === 'h5') {
//     return `${windowHeight - tabBarHeight}px`
//   }

//   if (process.env.TARO_ENV === 'alipay') {
//     // NOTE 支付宝比较迷，windowHeight 似乎是去掉了 tabBar 高度，但无 tab 页跟 tab 页返回高度是一样的
//     return `${windowHeight - statusBarHeight - titleBarHeight + (showTabBar ? 0 : TAB_BAR_HEIGHT)}px`
//   }

//   return `${windowHeight}px`
// }

export default class Index extends Component<PropsWithChildren, IState> {
  constructor(props) {
    super(props)
    this.state = {
      conversationId: undefined,
      isShare: undefined,
      scrollTop: 0
    }
  }
  
  componentDidMount = () => {
    const params = Taro.Current.router?.params

    this.setState({
      conversationId: params?.id,
      isShare: params?.share as any
    })

    const info = Taro.getSystemInfoSync()

    Taro.onKeyboardHeightChange(() => {
      const { windowHeight, statusBarHeight } = info
      this.setState({
        scrollTop: windowHeight //  - (statusBarHeight || 0)
      })
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
      path: `/pages/chat/index?id=${this.state.conversationId}&share=1`
    }
  }

  onShareTimeline = () => {
    let shareData = {
      title: '与 ChatGPT 的聊天记录 - 星搭小星',
      path: `/pages/chat/index?share=1&id=${this.state.conversationId}`,  // 分享的路径
      query: `share=1&id=${this.state.conversationId}`,
      imageUrl: 'https://mtbird-cdn.staringos.com/product/images/share.jpg'  // 分享的图片链接
    }
    return shareData;
  }

  render () {
    const { conversationId, isShare, scrollTop } = this.state

    return (
      <ScrollView className='chatContainer' scrollY scrollTop={scrollTop}>
        <View className='chatContent'>
          <MessageListView conversationId={conversationId} isShare={!!isShare} />
          <MessageInput conversationId={conversationId as string} isShare={!!isShare} />
        </View>
      </ScrollView>
    )
  }
}
