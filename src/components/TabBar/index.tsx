import { AtTabBar } from 'taro-ui'

import 'taro-ui/dist/style/components/tab-bar.scss'
import 'taro-ui/dist/style/components/badge.scss'

interface IProps {
  current: number;
}

const TabBar = ({current}: IProps) => {
  const handleClick = () => {

  }

  return (
    <AtTabBar
      fixed
      tabList={[
        { title: '首页', iconType: 'home' },
        // { title: '我的', iconType: 'user' },
      ]}
      onClick={handleClick}
      current={current}
    />
  )
}

export default TabBar