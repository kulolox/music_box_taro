import Taro, { Component } from '@tarojs/taro';
import { connect } from '@tarojs/redux';
import Player from '@/components/Player';

@connect(({ albums: { list } }) => ({ list }))
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
    this.setState({
      data: this.props.list.filter(t => t.url)
    });
  }

  render() {
    const { data } = this.state;
    if (data.length === 0) return null;
    const { songId } = this.$router.params;
    return <Player data={data} songId={songId} />;
  }
}

export default SongPlay;
