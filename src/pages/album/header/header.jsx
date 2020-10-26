import Taro, { Component } from '@tarojs/taro';
import { connect } from '@tarojs/redux';
import { View, Image } from '@tarojs/components';
import LineEllipsis from '@/components/LineEllipsis';

import cssStyles from './header.module.scss';

@connect(({ albums: { info } }) => ({ info }))
class Header extends Component {
  render() {
    const { info } = this.props;
    return (
      <View className={cssStyles.header}>
        <Image className={cssStyles.img} src={info.coverImgUrl} />
        <View className={cssStyles.description}>
          <LineEllipsis
            customStyles={{
              fontSize: Taro.pxTransform(16 * 2)
            }}
            text={info.name}
          />
          <View className={cssStyles.nickname}>{info.nickname}</View>
          {info.description && (
            <LineEllipsis
              customStyles={{
                fontSize: Taro.pxTransform(12 * 2),
                color: '#eee'
              }}
              text={info.description}
            />
          )}
        </View>
      </View>
    );
  }
}

export default Header;
