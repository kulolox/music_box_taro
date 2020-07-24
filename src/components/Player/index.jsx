import Taro, { Component } from '@tarojs/taro';
import PropTypes from 'prop-types';
import { View } from '@tarojs/components';
import { AtButton } from 'taro-ui';
import { connect } from '@tarojs/redux';
import { setAudioInstance } from '@/actions/player';

/**
 * 播放器核心组件
 * 设计：播放器组件应该是纯粹的，不应有复杂的UI，接受用户输入的相关参数，返回用户需要的相关数据
 */
@connect(
  ({ player: { data, currentId } }) => ({ data, currentId }),
  dispatch => ({
    setAudioInstanceAction(instance, callback) {
      dispatch(setAudioInstance(instance, callback));
    }
  })
)
class Player extends Component {
  static propTypes = {
    url: PropTypes.string.isRequired,
    startTime: PropTypes.number,
    autoplay: PropTypes.bool,
    loop: PropTypes.bool,
    volume: PropTypes.number,
    playbackRate: PropTypes.number
  };

  static defaultpropTypes = {
    startTime: 0,
    autoplay: false,
    loop: false,
    volume: 1,
    playbackRate: 1
  };

  constructor(props) {
    super(props);
    this.bgAudio = Taro.getBackgroundAudioManager();
    this.state = {
      currentIndex: 0,
      playing: false,
      currentTime: 0,
      duration: 0
    };
  }

  componentWillMount() {}

  componentDidMount() {
    const { autoplay, loop, playbackRate, startTime, currentId, data } = this.props;

    // 初始化播放器
    Object.assign(this.bgAudio, {
      loop,
      playbackRate,
      startTime
    });

    const index = data.findIndex(t => t.id == currentId);
    this.bgAudio.title = data[index].name;
    this.bgAudio.src = data[index].url;
    console.log('mount audio:', this.bgAudio);
    this.setState(
      {
        currentIndex: index
      },
      () => {
        if (autoplay) {
          this.play();
        }
      }
    );
  }

  componentDidShow() {
    console.log('show');
  }

  componentDidHide() {}

  componentWillUnmount() {
    this.innerAudioContext.destroy();
  }

  play = () => {
    const { data } = this.props;
    const { currentIndex } = this.state;
    this.bgAudio.title = data[currentIndex].name;
    this.bgAudio.src = data[currentIndex].url;
    this.bgAudio.play();
  };

  togglePlay = () => {
    this.setState(
      prevState => ({
        playing: !prevState.playing
      }),
      () => {
        if (this.state.playing) {
          this.bgAudio.play();
        } else {
          this.bgAudio.pause();
        }
      }
    );
  };

  goNextSong = () => {
    const { data } = this.props;
    const { currentIndex } = this.state;
    if (currentIndex >= data.length - 1) {
      Taro.showToast({
        title: '无下一曲'
      });
      return;
    }
    const index = currentIndex + 1;
    this.setState({ currentIndex: index, playing: true }, () => this.play());
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
    this.setState({ currentIndex: index, playing: true }, () => this.play());
  };

  render() {
    const { data } = this.props;
    const { currentIndex } = this.state;
    return (
      <View>
        <View>{data[currentIndex].name}</View>
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

export default Player;
