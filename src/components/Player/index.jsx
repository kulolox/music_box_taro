import Taro, { Component } from '@tarojs/taro';
import PropTypes from 'prop-types';
import { View } from '@tarojs/components';
import { AtButton, AtSlider } from 'taro-ui';

/**
 * 播放器核心组件
 * 播放器接受传入单个音乐数据和音乐列表
 * 播放器功能，播放，暂停，上一曲，下一曲，进度拖拽，音量调整，自动下一曲，单曲循环还是列表循环
 *
 */
export default class Player extends Component {
  static propTypes = {
    data: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    songId: PropTypes.string
  };

  static defaultpropTypes = {
    data: [],
    songId: ''
  };

  constructor(props) {
    super(props);
    this.bgAudio = Taro.getBackgroundAudioManager(); // 初始化播放器
    this.state = {
      currentTime: 0, // 当前播放秒数
      playing: false, // 播放状态
      seeking: false, // 触发进度条数据变化flag
      duration: 0, // 音频总时长
      played: 0, // 音频播放进度
      currentIndex: -1, // 当前歌曲索引
      loop: false, // 单曲循环还是顺序播放
      volums: 0.75 // 音量大小0-1
    };
  }

  componentDidMount() {
    const { data, songId } = this.props;
    if (songId) {
      const index = data.findIndex(t => t.id == songId);
      this.setState(
        {
          currentIndex: index,
          playing: true
        },
        this.play
      );
    } else {
      this.setState(
        {
          currentIndex: 0,
          playing: true
        },
        this.play
      );
    }
    // 音乐播放器事件
    this.bgAudio.onEnded(() => {
      console.log('音频自然播放完');
      if (this.setState.loop) {
        this.bgAudio.startTime = 0; // 回到开头
      } else if (this.hasNextSong()) {
        this.goNextSong();
      } else {
        this.setState({
          playing: false
        });
      }
    });
    this.bgAudio.onTimeUpdate(() => {
      // 获取当前播放进度
      this.setState({
        currentTime: this.bgAudio.currentTime,
        duration: this.bgAudio.duration
      });
    });
    this.bgAudio.onNext(() => {
      this.goNextSong();
    });
    this.bgAudio.onPrev(() => {
      this.goPrevSong();
    });
  }

  hasNextSong = () => {
    return this.currentIndex < this.props.data.length - 1;
  };

  play = () => {
    const { data } = this.props;
    const { currentIndex, playing } = this.state;
    if (!Array.isArray(data)) {
      Object.assign(this.bgAudio, {
        title: data.name,
        src: data.url,
        coverImgUrl: data.coverImgUrl,
        singer: data.authors
      });
    } else {
      Object.assign(this.bgAudio, {
        title: data[currentIndex].name,
        src: data[currentIndex].url,
        coverImgUrl: data[currentIndex].coverImgUrl,
        singer: data[currentIndex].authors
      });
    }
    if (playing) {
      this.bgAudio.play();
    }
  };

  // 播放暂停
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
        icon: 'none',
        title: '无下一曲'
      });
      return;
    }
    const index = currentIndex + 1;
    this.setState({ currentIndex: index, playing: true }, this.play);
  };

  goPrevSong = () => {
    const { currentIndex } = this.state;
    if (currentIndex === 0) {
      Taro.showToast({
        icon: 'none',
        title: '无上一曲'
      });
      return;
    }
    const index = currentIndex - 1;
    this.setState({ currentIndex: index, playing: true }, this.play);
  };

  onSeekChange = e => {
    console.log('changed:', e);
    this.setState({
      currentTime: e
    });
    this.bgAudio.seek(e);
  };
  onSeekChanging = e => {
    console.log('changing:', e);
    this.setState({
      currentTime: e
    });
  };

  render() {
    const { data } = this.props;
    const { currentIndex, currentTime, duration } = this.state;
    return (
      <View>
        <View>{data[currentIndex].name}</View>
        <View>
          <View style={{ background: '#eee' }}>
            <AtSlider
              activeColor='#ddff00'
              backgroundColor='#ff00dd'
              blockColor='#00ffdd'
              blockSize={12}
              min={0}
              max={duration}
              value={currentTime}
              onChange={this.onSeekChange}
              onChanging={this.onSeekChanging}
            />
          </View>
        </View>
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
