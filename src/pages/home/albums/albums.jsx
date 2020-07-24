import Taro, { Component } from '@tarojs/taro';
import { connect } from '@tarojs/redux';
import { Image, View, Text } from '@tarojs/components';
import LineEllipsis from '@/components/LineEllipsis';

import cssStyles from './albums.module.scss';

@connect(({ home: { albums } }) => ({ albums }))
class Albums extends Component {
  constructor(props) {
    super(props);
    this.goToSong = this.goToSong.bind(this);
  }

  goToSong(id) {
    Taro.navigateTo({
      url: `/pages/songlist/songlist?id=${id}`
    });
  }

  render() {
    const { albums } = this.props;
    return (
      <View className={cssStyles.album}>
        <View className={cssStyles.title}>歌单列表</View>
        <View className={cssStyles['album-list']}>
          {albums.map(album => (
            <View onClick={() => this.goToSong(album.id)} className={cssStyles.item} key={album.id}>
              <View className={cssStyles['item-content']}>
                <Image className={cssStyles.coverimg} src={album.coverImgUrl} mode='aspectFill' lazyLoad />
                <View className={cssStyles['nick-name']}>
                  <Text>{album.nickname}</Text>
                </View>
                <View className={cssStyles.playCount}>
                  <Text>{album.playCount}</Text>
                </View>
              </View>
              <LineEllipsis text={album.name} />
            </View>
          ))}
        </View>
      </View>
    );
  }
}

export default Albums;
