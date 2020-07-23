import Taro, { Component } from '@tarojs/taro';
import { connect } from '@tarojs/redux';
import { View, Image } from '@tarojs/components';

import cssStyles from './header.module.scss';
import LineEllipsis from '@/components/LineEllipsis';

@connect(({ song: { songInfo } }) => ({ songInfo }))
class Header extends Component {
  render() {
    const { songInfo } = this.props;
    return (
      <View className={cssStyles.header}>
        <Image className={cssStyles.img} src={songInfo.coverImgUrl} />
        <View className={cssStyles.description}>
          <LineEllipsis
            customStyles={{
              fontSize: Taro.pxTransform(16 * 2)
            }}
            text={songInfo.name}
          />
          <View className={cssStyles.nickname}>{songInfo.nickname}</View>
          {songInfo.description && (
            <LineEllipsis
              customStyles={{
                fontSize: Taro.pxTransform(12 * 2),
                color: '#eee'
              }}
              text={songInfo.description}
            />
          )}
        </View>
      </View>
    );
  }
}

export default Header;
