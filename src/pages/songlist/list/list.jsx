import Taro, { Component } from '@tarojs/taro';
import { connect } from '@tarojs/redux';
import { View, Text } from '@tarojs/components';
import { AtIcon } from 'taro-ui';
import LineEllipsis from '@/components/LineEllipsis';
import Duration from '@/components/Duration';
import { setPlayer } from '@/actions/player';

import cssStyles from './list.module.scss';

@connect(({ song: { list } }) => ({ list }))
class List extends Component {
  constructor(props) {
    super(props);
    this.goToSong = this.goToSong.bind(this);
  }

  goToSong(songId, flag) {
    if (!flag) return;
    Taro.navigateTo({
      url: `/pages/songPlay/songPlay?songId=${songId}`
    });
  }

  render() {
    const { list } = this.props;
    return (
      <View className={cssStyles['list-box']}>
        <View className={cssStyles.list}>
          {list.map((t, i) => (
            <View onClick={() => this.goToSong(t.id, t.url)} className={cssStyles.item} key={t.id}>
              <View className={cssStyles.num}>{i + 1}</View>
              <View className={cssStyles.info}>
                <LineEllipsis
                  customStyles={{
                    color: '#222',
                    marginBottom: Taro.pxTransform(4 * 2)
                  }}
                  text={t.name}
                />
                <LineEllipsis
                  customStyles={{
                    fontSize: Taro.pxTransform(12 * 2)
                  }}
                  text={t.authors}
                />
              </View>
              {t.url ? (
                <Duration
                  customStyles={{
                    flex: 1,
                    fontSize: Taro.pxTransform(12 * 2)
                  }}
                  seconds={t.seconds}
                />
              ) : (
                <Text
                  style={{
                    fontSize: Taro.pxTransform(12 * 2)
                  }}
                >
                  无版权
                </Text>
              )}
              <View className={cssStyles.icon}>{t.url && <AtIcon value='play' size='20' />}</View>
            </View>
          ))}
        </View>
      </View>
    );
  }
}

export default List;
