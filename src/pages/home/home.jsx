import Taro, { Component } from '@tarojs/taro';
import { connect } from '@tarojs/redux';
import { View } from '@tarojs/components';
import Banner from './banner/banner';
import Albums from './albums/albums';

import { getHomeBanners, getHomeAlbums, concatHomeAlbums } from '@/actions/home';

@connect(
  ({ home: { banners, albums } }) => ({ banners, albums }),
  dispatch => ({
    getHomeBannersAction(callback) {
      dispatch(getHomeBanners(callback));
    },
    getHomeAlbumsAction(requestIfo, callback) {
      dispatch(getHomeAlbums(requestIfo, callback));
    },
    concatHomeAlbumsAction(requestIfo, callback) {
      dispatch(concatHomeAlbums(requestIfo, callback));
    }
  })
)
class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false, // 加载状态
      pageNum: 0,
      limit: 20,
      order: 'hot',
      offset: 0
    };
    this.getHomeData = this.getHomeData.bind(this);
  }

  config = {
    navigationBarTitleText: 'K 云音乐',
    navigationBarBackgroundColor: '#5169ec',
    navigationBarTextStyle: 'white',
    backgroundTextStyle: 'dark',
    onReachBottomDistance: 360, // 滚动加载阈值
    enablePullDownRefresh: true
  };

  componentWillUnmount() {}

  componentDidMount() {
    Taro.showLoading({
      title: '加载中...'
    });
    this.getHomeData(() => {
      Taro.hideLoading();
      this.setState({
        pageNum: 1
      });
    });
  }

  /** 滚动底部(上拉加载) **/
  onReachBottom() {
    console.log('上拉加载');
    const { concatHomeAlbumsAction } = this.props;
    const { limit, order, pageNum } = this.state;
    const newPageNum = pageNum + 1;
    const requestInfo = {
      limit,
      order,
      offset: newPageNum * limit
    };
    concatHomeAlbumsAction(requestInfo, () => {
      this.setState({
        pageNum: newPageNum
      });
    });
  }

  // 下拉刷新，重置数据状态
  onPullDownRefresh() {
    console.log('下拉刷新');

    this.getHomeData(() => {
      Taro.stopPullDownRefresh();
    });
  }

  getHomeData(callback) {
    const { limit, order, pageNum } = this.state;
    // 获取轮播数据
    this.props.getHomeBannersAction();
    const requestInfo = {
      limit,
      order,
      offset: pageNum * limit
    };
    // 获取albums数据
    this.props.getHomeAlbumsAction(requestInfo, callback);
  }

  render() {
    const { banners, albums } = this.props;
    return (
      <View>
        {banners.length > 0 && <Banner />}
        {albums.length > 0 && <Albums />}
      </View>
    );
  }
}

export default Index;
