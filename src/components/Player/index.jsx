import Taro, { Component } from '@tarojs/taro';
import PropTypes from 'prop-types';
import { View } from '@tarojs/components';

/**
 * 播放器核心组件
 * 设计：播放器组件应该是纯粹的，不应有复杂的UI，接受用户输入的相关参数，返回用户需要的相关数据
 */
class Player extends Component {
  static propTypes = {
    url: PropTypes.string.isRequired,
    playing: PropTypes.bool,
    startTime: PropTypes.number,
    autoplay: PropTypes.bool,
    loop: PropTypes.bool,
    volume: PropTypes.number,
    playbackRate: PropTypes.number
  };

  static defaultpropTypes = {
    startTime: 0,
    autoplay: false,
    playing: false,
    loop: false,
    volume: 1,
    playbackRate: 1
  };

  constructor(props) {
    super(props);
    this.innerAudioContext = Taro.createInnerAudioContext();
    this.state = {
      currentTime: 0,
      duration: 0
    };
  }

  componentWillMount() {
    // 注册audio监听事件
    this.innerAudioContext.onCanplay(() => {
      console.log('音乐可以播放');
    });

    this.innerAudioContext.onPlay(() => {
      console.log('开始播放:', this.innerAudioContext.duration);
    });

    this.innerAudioContext.onError(res => {
      console.log('error msg:', res.errMsg);
      console.log('error code:', res.errCode);
    });

    this.innerAudioContext.onTimeUpdate(() => {
      console.log('currentTime:', this.innerAudioContext.currentTime);
    });
  }

  componentDidMount() {
    const { autoplay, loop, playbackRate, startTime } = this.props;
    // 初始化播放器
    Object.assign(this.innerAudioContext, {
      autoplay,
      loop,
      playbackRate,
      startTime
    });
  }

  shouldComponentUpdate(prevProps) {
    if (this.props.url !== prevProps.url || this.props.playing !== prevProps.playing) {
      return true;
    }
    return false;
  }

  componentDidShow() {
    console.log('page show');
  }

  componentWillUnmount() {
    this.innerAudioContext.destroy();
  }

  init = () => {
    console.log('init');
    const { url, playing } = this.props;
    this.innerAudioContext.src = url;
    if (playing) {
      this.innerAudioContext.play();
    } else {
      this.innerAudioContext.pause();
    }
  };

  render() {
    console.log('render');
    this.init();
    return <View></View>;
  }
}

export default Player;
