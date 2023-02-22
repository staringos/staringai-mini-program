import Taro from '@tarojs/taro'
// 引入 Swiper, SwiperItem 组件
import { Image, Swiper, SwiperItem, View } from '@tarojs/components'
import styles from './style.module.less'
import {useStore} from '../../store'
import { observer } from 'mobx-react-lite'

const HomeSwiper = observer(() => {
  const { newConversation } = useStore()

  const handleClick = (id: string | undefined) => {
    Taro.navigateTo({
      url: `/pages/chat/index?id=${id}`
    })
  }

  const handleNewChat = async () => {
    const id = await newConversation()
    handleClick(id)
  }

  return (
    <Swiper
      className={styles.swiper}
      indicatorColor='#999'
      indicatorActiveColor='#333'
      vertical
      circular
      indicatorDots
      autoplay
      >
      <SwiperItem>
        <View className={styles.banner} onClick={handleNewChat}>
          <Image className={styles.bannerImage} src='https://mtbird-cdn.staringos.com/product/images/banner2.png' />
        </View>
      </SwiperItem>
    </Swiper>
  )
})

export default HomeSwiper