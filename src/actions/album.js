import Taro from '@tarojs/taro'
import { SET_ALBUMS } from '@/constants/albums';
import { getAlbumDetail, getSongList, getSongUrl } from '@/api/get';
import { arraySplit, checkMusic } from '@/utils/tools';

// 获取歌单信息
export const getAlbums = (id, callback) => async dispatch => {
  // 获取歌单详情
  const {
    data: { playlist }
  } = await getAlbumDetail(id);

  const data = {
    info: {
      albumId: playlist.id,
      name: playlist.name,
      nickname: playlist.creator.nickname,
      coverImgUrl: playlist.coverImgUrl,
      description: playlist.description,
    },
    list: [],
  };

  // 数组分片，getSongList有请求大小限制
  const formatIds = arraySplit(playlist.trackIds.map(t => t.id)).map(t => t.join(','));

  const requests = formatIds.map(ids => getSongList(ids));

  const result = await Promise.all(requests);

  let songs = [];
  let privileges = [];

  result.forEach(t => {
    songs = songs.concat(t.data.songs);
    privileges = privileges.concat(t.data.privileges);
  });

  data.list = songs.map((t, i) => ({
    id: t.id,
    name: t.name,
    seconds: t.dt / 1000,
    authors: t.ar.map(j => j.name).join('，'),
    coverImgUrl: t.al.picUrl,
    canPlay: checkMusic(privileges[i]),
    url: null
  }));

  // 获取歌词,先通过checkMusic筛选一遍，再获url筛选一遍（服务器在国外，有些可播放歌曲取不到url）
  const urlRequests = data.list.map(t => getSongUrl(t.id));
  const urlResult = await Promise.all(urlRequests);
  data.list.forEach((t, i) => t.url = urlResult[i].data.data[0].url)
  // 添加专辑详情缓存
  Taro.setStorage({
    key: `ALBUM_ID:${id}`,
    data,
  })

  dispatch({
    type: SET_ALBUMS,
    data
  });

  callback && callback();
};

export const setAlbums = (data) => dispatch => {
  dispatch({
    type: SET_ALBUMS,
    data
  });
}