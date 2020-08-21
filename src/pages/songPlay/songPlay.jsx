import Taro, { Component } from '@tarojs/taro';
import { connect } from '@tarojs/redux';
import Player from '@/components/Player';
import { getSongUrl } from '@/api/get';

@connect(({ song: { list, songInfo: { albumId } } }) => ({ list, albumId }))
class SongPlay extends Component {
  config = {
    navigationBarTitleText: '播放',
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#5169ec',
    navigationBarTextStyle: 'white'
  };

  state = {
    data: [] // 歌曲列表
  };

  async componentDidMount() {
    Taro.showLoading({
      title: '加载中...'
    });
    const { albumId } = this.props;
    const key = `ALBUM_ID:${albumId}`;
    // 缓存机制
    let data = Taro.getStorageSync(key);
    if (!data) {
      data = await this.getSongDetail();
      Taro.setStorage({
        key: key,
        data
      });
    }
    this.setState({
      data: typeof data === 'string' ? JSON.parse(data) : data
    });
    Taro.hideLoading();
  }

  getSongDetail = async () => {
    // 筛选出可播放歌曲
    const data = this.props.list.filter(t => t.canPlay);

    // 获取歌曲播放url
    const requests = data.map(t => getSongUrl(t.id));

    const result = await Promise.all(requests);

    // 将歌曲播放url加入歌曲列表
    for (let i = 0; i < data.length; i++) {
      data[i].url = result[i].data.data[0].url;
    }
    return data;
  };

  render() {
    const { data } = this.state;
    if (data.length === 0) return null;
    const { songId } = this.$router.params;
    return <Player data={data} songId={songId} />;
  }
}

export default SongPlay;
