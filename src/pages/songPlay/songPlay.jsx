import Taro, { Component } from '@tarojs/taro';
import { connect } from '@tarojs/redux';
import Player from '@/components/Player';
import { setPlayer } from '@/actions/player';

@connect(
  ({ player: { data } }) => ({ data }),
  dispatch => ({
    setPlayerAction(id, callback) {
      dispatch(setPlayer(id, callback));
    }
  })
)
class SongPlay extends Component {
  config = {
    navigationBarTitleText: '播放页',
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#5169ec',
    navigationBarTextStyle: 'white'
  };

  componentWillMount() {}

  componentDidMount() {
    Taro.showLoading({
      title: '加载中...'
    });
    const { id } = this.$router.params;

    this.props.setPlayerAction(id, () => {
      Taro.hideLoading();
    });
  }

  componentDidShow() {}

  componentDidHide() {}

  componentWillUnmount() {}

  render() {
    if (this.props.data.length === 0) return null;
    return <Player />;
  }
}

export default SongPlay;
