import { SET_SONG_INFO, SET_SONG_LIST } from '@/constants/songlist';
import { getPlaylist, getSongDetail, getSongUrl } from '@/api/get';
import { arraySplit, checkMusic } from '@/utils/tools';

// 获取歌单信息
export const getSongInfo = (id, callback) => async dispatch => {
  const {
    data: { playlist }
  } = await getPlaylist(id);

  const newData = {
    albumId: playlist.id,
    name: playlist.name,
    nickname: playlist.creator.nickname,
    coverImgUrl: playlist.coverImgUrl,
    description: playlist.description,
    trackIds: playlist.trackIds
  };

  dispatch({
    type: SET_SONG_INFO,
    data: newData
  });
  callback && callback();
};

// 获取歌单歌曲列表
export const getSongList = callback => async (dispatch, getState) => {
  const {
    song: { songInfo }
  } = await getState();

  // 数组分片，getSongDetail有请求大小限制
  const formatIds = arraySplit(songInfo.trackIds.map(t => t.id)).map(t => t.join(','));

  const requests = formatIds.map(ids => getSongDetail(ids));

  const result = await Promise.all(requests);

  let songs = [];
  let privileges = [];

  result.forEach(t => {
    songs = songs.concat(t.data.songs);
    privileges = privileges.concat(t.data.privileges);
  });

  const list = songs.map((t, i) => ({
    id: t.id,
    name: t.name,
    seconds: t.dt / 1000,
    authors: t.ar.map(j => j.name).join('，'),
    coverImgUrl: t.al.picUrl,
    canPlay: checkMusic(privileges[i]),
    url: null
  }));

  // 获取歌词,先通过checkMusic筛选一遍，再获url筛选一遍（服务器在国外，有些可播放歌曲取不到url）
  const urlRequests = list.filter(t => t.canPlay).map(t => getSongUrl(t.id));
  const urlResult = await Promise.all(urlRequests);

  for (let i = 0; i < list.length; i++) {
    list[i].url = urlResult[i].data.data[0].url;
  }

  dispatch({
    type: SET_SONG_LIST,
    data: list
  });

  callback && callback(list);
};

export const setSongList = data => dispatch => {
  dispatch({
    type: SET_SONG_LIST,
    data
  });
};
