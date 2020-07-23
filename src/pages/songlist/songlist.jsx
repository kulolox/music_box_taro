import Taro, { Component } from '@tarojs/taro';
import { connect } from '@tarojs/redux';
import { View } from '@tarojs/components';

import { getSongInfo, getSongList } from '@/actions/songlist';
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
    }
  })
)
class SongList extends Component {
  config = {
    navigationBarTitleText: '歌单',
    navigationBarBackgroundColor: '#5169ec',
    navigationBarTextStyle: 'white'
  };
  componentDidShow() {
    const { id } = this.$router.params;
    Taro.showLoading({
      title: '加载中...'
    });
    // TODO 代码需要优化，最好能以Promise的形式调用
    this.props.getSongInfoAction(id, () => {
      this.props.getSongListAction(() => {
        Taro.hideLoading();
      });
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
