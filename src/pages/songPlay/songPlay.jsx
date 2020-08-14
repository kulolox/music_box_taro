import Taro, { Component } from '@tarojs/taro';
import { connect } from '@tarojs/redux';
import Player from '@/components/Player';
import { getSongUrl } from '@/api/get';

@connect(({ song: { list } }) => ({ list }))
class SongPlay extends Component {
  config = {
    navigationBarTitleText: '播放页',
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#5169ec',
    navigationBarTextStyle: 'white'
  };

  state = {
    id: '',
    data: [] // 歌曲列表
  };

  async componentDidMount() {
    Taro.showLoading({
      title: '加载中...'
    });
    const { id } = this.$router.params;
    this.setState({
      id
    });
    await this.getSongDetail();
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
    this.setState({
      data
    });
  };

  componentDidShow() {}

  componentDidHide() {}

  componentWillUnmount() {}

  render() {
    const { data, id } = this.state;
    if (data.length === 0) return null;
    console.log('id 外：', id);
    return <Player data={data} songId={id} />;
  }
}

export default SongPlay;
