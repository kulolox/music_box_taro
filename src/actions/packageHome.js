import { SET_PACKAGE_HOME_BANNERS, SET_PACKAGE_HOME_ALBUMS, CONCAT_PACKAGE_HOME_ALBUMS } from '@/constants/packageHome';
import { getBanner, getAlbums } from '@/api/get';

// 格式化专辑数据
const formateAlbums = t => ({
  id: t.id,
  coverImgUrl: t.coverImgUrl,
  nickname: t.creator.nickname,
  name: t.name,
  playCount: t.playCount
});

export const getPackageHomeBanners = () => async dispatch => {
  const {
    data: { banners }
  } = await getBanner(0);
  const newData = banners.map(t => ({
    id: t.scm,
    imageUrl: t.imageUrl
  }));
  dispatch({
    type: SET_PACKAGE_HOME_BANNERS,
    data: newData
  });
};

export const getPackageHomeAlbums = (pageInfo, callback) => async dispatch => {
  const {
    data: { playlists }
  } = await getAlbums(pageInfo);

  const newData = playlists.map(formateAlbums);

  dispatch({
    type: SET_PACKAGE_HOME_ALBUMS,
    data: newData
  });
  callback && callback();
};

export const concatPackageHomeAlbums = (pageInfo, callback) => async (dispatch, getState) => {
  const {
    packageHome: { albums }
  } = getState();
  const {
    data: { playlists }
  } = await getAlbums(pageInfo);

  const newData = albums.concat(playlists.map(formateAlbums));

  dispatch({
    type: CONCAT_PACKAGE_HOME_ALBUMS,
    data: newData
  });
  callback && callback();
};
