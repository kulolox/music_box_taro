import Taro, { Component } from '@tarojs/taro';
import { connect } from '@tarojs/redux';
import { View } from '@tarojs/components';

import { getSongInfo, getSongList, setSongList } from '@/actions/songlist';
import Header from './header/header';
import List from './list/list';

@connect(
  song => song,
  dispatch => ({
    getSongInfoAction(id, callback) {
      dispatch(getSongInfo(id, callback));
    },
    getSongListAction(callback) {
      dispatch(getSongList(callback));
    },
    setSongListAction(data) {
      dispatch(setSongList(data));
    }
  })
)
class SongList extends Component {
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
    // TODO 代码需要优化，最好能以Promise的形式调用
    this.props.getSongInfoAction(albumId, () => {
      // 缓存机制(缓存专辑详情，包括url，url只是作为是否可播放的参考，实际是再播放时判断)
      const key = `ALBUM_ID:${albumId}`;
      const cacheSongList = Taro.getStorageSync(key);
      if (!cacheSongList) {
        this.props.getSongListAction(list => {
          Taro.setStorage({
            key: key,
            data: list
          });
          Taro.hideLoading();
        });
      } else {
        console.log(cacheSongList);
        this.props.setSongListAction(cacheSongList);
        Taro.hideLoading();
      }
    });
  }

  render() {
    const { list } = this.props.song;
    return (
      <View>
        <Header />
        {list.length > 0 && <List />}
      </View>
    );
  }
}

export default SongList;
