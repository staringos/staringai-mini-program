import Taro from '@tarojs/taro'
// 引入 Swiper, SwiperItem 组件
import { Image, Swiper, SwiperItem, View } from '@tarojs/components'
import styles from './style.module.less'

const HomeSwiper = () => {
  return (
    <Swiper
      className='test-h'
      indicatorColor='#999'
      indicatorActiveColor='#333'
      vertical
      circular
      indicatorDots
      autoplay>
      <SwiperItem>
        <View className={styles.banner}>
          <Image className={styles.bannerImage} src='https://mtbird-cdn.staringos.com/product/images/banner2.png' />
        </View>
      </SwiperItem>
    </Swiper>
  )
}

export default HomeSwiper