import Taro, { Component } from '@tarojs/taro';
import { connect } from '@tarojs/redux';
import { View } from '@tarojs/components';
import { AtButton } from 'taro-ui';
import Player from '@/components/Player';
import { getSongUrl } from '@/api/get';

@connect(player => player)
class SongPlay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      currentIndex: 0,
      url: '',
      playing: false
    };
    this.togglePlay = this.togglePlay.bind(this);
  }

  config = {
    navigationBarTitleText: '播放页',
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#5169ec',
    navigationBarTextStyle: 'white'
  };

  componentWillMount() {}

  async componentDidMount() {
    const { data } = this.props.player;
    const { id } = this.$router.params;
    const index = data.findIndex(t => t.id === parseInt(id));
    this.setState(
      {
        data,
        currentIndex: index
      },
      () => this.getCurrentSong(index)
    );
  }

  componentDidShow() {}

  componentDidHide() {}

  componentWillUnmount() {}

  togglePlay() {
    this.setState(prevState => ({
      playing: !prevState.playing
    }));
  }

  getCurrentSong = async index => {
    const { data } = this.state;
    const { name, id } = data[index];
    Taro.setNavigationBarTitle({
      title: name
    });
    // 先加载页面信息
    this.setState({
      currentIndex: index
    });
    // TODO 请求数据，可以loading处理
    const result = await getSongUrl(id);
    this.setState({
      url: result.data.data[0].url
    });
  };

  goNextSong = () => {
    const { currentIndex, data } = this.state;
    if (currentIndex >= data.length - 1) {
      Taro.showToast({
        title: '无下一曲'
      });
      return;
    }
    const index = currentIndex + 1;
    this.getCurrentSong(index);
  };

  goPrevSong = () => {
    const { currentIndex } = this.state;
    if (currentIndex === 0) {
      Taro.showToast({
        title: '无上一曲'
      });
      return;
    }
    const index = currentIndex - 1;
    this.getCurrentSong(index);
  };

  render() {
    const { data, currentIndex, playing, url } = this.state;
    return (
      <View>
        <View>{data[currentIndex].name}</View>
        <Player autoplay playing={playing} url={url} />
        <View
          style={{
            marginTop: '200px',
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          <AtButton onClick={this.goPrevSong}>上一曲</AtButton>
          <AtButton onClick={this.togglePlay}>{!playing ? '播放' : '暂停'}</AtButton>
          <AtButton onClick={this.goNextSong}>下一曲</AtButton>
        </View>
      </View>
    );
  }
}

export default SongPlay;
