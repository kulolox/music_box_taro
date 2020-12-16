import Taro, { Component } from '@tarojs/taro';
import { connect } from '@tarojs/redux';
import { View } from '@tarojs/components';

import { getAlbums, setAlbums } from '@/actions/album';
import Header from './header/header';
import List from './list/list';

@connect(
  albums => albums,
  dispatch => ({
    getAlbumsAction(id, callback) {
      dispatch(getAlbums(id, callback));
    },
    setAlbumsAction(data) {
      dispatch(setAlbums(data));
    },
  })
)
class Album extends Component {
  config = {
    navigationBarTitleText: '歌单',
    navigationBarBackgroundColor: '#5169ec',
    navigationBarTextStyle: 'white'
  };

  componentDidMount() {
    Taro.showLoading({
      title: '加载中...'
    });
    const { albumId } = this.$router.params;
    const key = `ALBUM_ID:${albumId}`;
    // 歌单缓存，存在则直接设置，不存在则获取
    const cacheAlbum = Taro.getStorageSync(key);
    if (!cacheAlbum) {
      this.props.getAlbumsAction(albumId, () => {
        Taro.hideLoading();
      })
    } else {
      this.props.setAlbumsAction(cacheAlbum)
      Taro.hideLoading();
    }
  }

  render() {
    const { list } = this.props.albums;
    return (
      <View>
        <Header />
        {list.length > 0 && <List />}
      </View>
    );
  }
}

export default Album;
