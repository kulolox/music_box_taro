import Taro, { Component } from '@tarojs/taro';
import { connect } from '@tarojs/redux';
import { Swiper, SwiperItem, Image } from '@tarojs/components';

@connect(({ packageHome: { banners } }) => ({ banners }))
class Banner extends Component {
  render() {
    const { banners } = this.props;
    return (
      <Swiper indicatorColor='#dcdcdc' indicatorActiveColor='#fff' circular indicatorDots autoplay>
        {banners.map(banner => (
          <SwiperItem key={banner.id}>
            <Image style={{ width: '100%', height: '100%' }} src={banner.imageUrl} mode='scaleToFill' lazyLoad />
          </SwiperItem>
        ))}
      </Swiper>
    );
  }
}

export default Banner;
