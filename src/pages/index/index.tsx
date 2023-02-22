import { Component, PropsWithChildren } from 'react'
import { View } from '@tarojs/components'

import "taro-ui/dist/style/components/input.scss";
import "taro-ui/dist/style/components/icon.scss";
import "taro-ui/dist/style/components/button.scss" // 按需引入
import './index.less'
import ConversationList from '../../components/ConversationList';
import TabBar from '../../components/TabBar';
import HomeSwiper from '../../components/HomeSwiper';

export default class Index extends Component<PropsWithChildren> {
  onShareAppMessage = (res) => {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '与 ChatGPT 立即开聊 - 星搭小星',
      path: `/pages/index/index?f=sam`
    }
  }

  onShareTimeline = () => {
    let shareData = {
      title: '与 ChatGPT 立即开聊 - 星搭小星',
      path: `/pages/index/index?f=st`,  // 分享的路径
      // imageUrl： '',  // 分享的图片链接
    }
    return shareData;
  }

  render () {
    return (
      <View className='container'>
        <HomeSwiper />
        <ConversationList />
        <TabBar current={0} />
      </View>
    )
  }
}
