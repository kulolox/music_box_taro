import Taro, { Component } from '@tarojs/taro';
import PropTypes from 'prop-types';
import { View, Image } from '@tarojs/components';
import { AtSlider, AtIcon } from 'taro-ui';
import cssStyles from './index.module.scss';
import Duration from '../Duration';
import { getSongUrl } from '@/api/get';

const buttonColor = '#333';
const buttonLagre = 42;
const buttonNomal = 24;

/**
 * 播放器核心组件
 * 播放器接受传入单个音乐数据和音乐列表
 * 播放器功能，播放，暂停，上一曲，下一曲，进度拖拽，音量调整，自动下一曲，单曲循环还是列表循环
 */
export default class Player extends Component {
  static propTypes = {
    data: PropTypes.array,
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
      if (this.hasNextSong()) {
        this.goNextSong();
      } else {
        //TODO 最后一曲(从头播还是停止)
        this.setState({
          playing: false
        });
      }
    });
    this.bgAudio.onTimeUpdate(() => {
      // 拖拽进度时不刷新
      if (!this.state.seeking) {
        // 获取当前播放进度
        this.setState({
          currentTime: this.bgAudio.currentTime,
          duration: this.bgAudio.duration
        });
      }
    });
    this.bgAudio.onNext(() => {
      this.goNextSong();
    });
    this.bgAudio.onPrev(() => {
      this.goPrevSong();
    });
  }

  onSeekChange = e => {
    console.log('changed:', e);
    this.setState({
      currentTime: e,
      seeking: false
    });
    this.bgAudio.seek(e);
  };

  onSeekChanging = e => {
    this.setState({
      currentTime: e,
      seeking: true
    });
  };

  hasNextSong = () => {
    return this.state.currentIndex < this.props.data.length - 1;
  };

  play = () => {
    const { data } = this.props;
    const { currentIndex, playing } = this.state;
    // 根据id重新获取播放url
    getSongUrl(data[currentIndex].id).then(res => {
      Object.assign(this.bgAudio, {
        title: data[currentIndex].name,
        src: res.data.data[0].url,
        coverImgUrl: data[currentIndex].coverImgUrl,
        singer: data[currentIndex].authors
      });
      // 文件准备完毕再播放
      if (playing) {
        this.bgAudio.play();
      }
    });
    Taro.setNavigationBarTitle({
      title: data[currentIndex].name
    });
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

  render() {
    const { data } = this.props;
    const { currentTime, duration, currentIndex, playing } = this.state;
    return (
      <View className={cssStyles.player}>
        <View className={cssStyles.bgBox}>
          <Image className={cssStyles.bgImage} src={data[currentIndex].coverImgUrl} />
        </View>

        <View className={cssStyles.header}>
          <View className={cssStyles.coverImg}>
            <Image className={cssStyles.img} src={data[currentIndex].coverImgUrl} />
          </View>
        </View>

        <View className={cssStyles.message}>
          <View className={cssStyles.currentTime}>
            <Duration seconds={currentTime} />
          </View>
          <View className={cssStyles.progress}>
            <AtSlider
              activeColor='#5169ec'
              backgroundColor='#dcdcdc'
              blockColor='#5169ec'
              blockSize={12}
              min={0}
              max={duration}
              value={currentTime}
              onChange={this.onSeekChange}
              onChanging={this.onSeekChanging}
            />
          </View>
          <View className={cssStyles.duration}>
            <Duration seconds={duration} />
          </View>
        </View>

        <View className={cssStyles.footer}>
          <View className={cssStyles.buttons}>
            <View className={cssStyles.button} onClick={this.goPrevSong}>
              <AtIcon prefixClass='icon' value='prev' color={buttonColor} size={buttonNomal} />
            </View>
            <View className={cssStyles.button} onClick={this.togglePlay}>
              {!playing ? (
                <AtIcon prefixClass='icon' value='play' color={buttonColor} size={buttonLagre} />
              ) : (
                <AtIcon prefixClass='icon' value='pause' color={buttonColor} size={buttonLagre} />
              )}
            </View>
            <View className={cssStyles.button} onClick={this.goNextSong}>
              <AtIcon prefixClass='icon' value='next' color={buttonColor} size={buttonNomal} />
            </View>
          </View>
        </View>
      </View>
    );
  }
}
