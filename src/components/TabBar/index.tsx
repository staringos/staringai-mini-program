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
        { title: '้ฆ้กต', iconType: 'home' },
        // { title: 'ๆ็', iconType: 'user' },
      ]}
      onClick={handleClick}
      current={current}
    />
  )
}

export default TabBar