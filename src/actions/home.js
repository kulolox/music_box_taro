import { SET_HOME_BANNERS, SET_HOME_ALBUMS, CONCAT_HOME_ALBUMS } from '@/constants/home';
import { getBanner, getAlbumList } from '@/api/get';

// 格式化专辑数据
const formateAlbums = t => ({
  id: t.id,
  coverImgUrl: t.coverImgUrl,
  nickname: t.creator.nickname,
  name: t.name,
  playCount: t.playCount
});

export const getBanners = () => async dispatch => {
  const {
    data: { banners }
  } = await getBanner(0);
  const newData = banners.map(t => ({
    id: t.scm,
    imageUrl: t.imageUrl
  }));
  dispatch({
    type: SET_HOME_BANNERS,
    data: newData
  });
};

export const getAlbums = (pageInfo, callback) => async dispatch => {
  const {
    data: { playlists }
  } = await getAlbumList(pageInfo);

  const newData = playlists.map(formateAlbums);

  dispatch({
    type: SET_HOME_ALBUMS,
    data: newData
  });
  callback && callback();
};

export const concatAlbums = (pageInfo, callback) => async (dispatch, getState) => {
  const {
    home: { albums }
  } = getState();
  const {
    data: { playlists }
  } = await getAlbumList(pageInfo);

  const newData = albums.concat(playlists.map(formateAlbums));

  dispatch({
    type: CONCAT_HOME_ALBUMS,
    data: newData
  });
  callback && callback();
};
