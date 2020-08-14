import { SET_SONG_INFO, SET_SONG_LIST } from '@/constants/songlist';
import { getPlaylist, getSongDetail } from '@/api/get';
import { checkMusic, arraySplit } from '@/utils/tools';

// 获取歌单信息
export const getSongInfo = (id, callback) => async dispatch => {
  const {
    data: { playlist }
  } = await getPlaylist(id);

  const newData = {
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
    id: privileges[i].id,
    name: t.name,
    seconds: t.dt / 1000,
    authors: t.ar.map(j => j.name).join('，'),
    coverImgUrl: t.al.picUrl,
    canPlay: checkMusic(privileges[i])
  }));

  dispatch({
    type: SET_SONG_LIST,
    data: list
  });

  callback && callback();
};
