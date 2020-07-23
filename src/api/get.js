import httpRequest from './http';

export const getBanner = type => {
  return httpRequest.get('banner', { type });
};

export const getAlbums = params => {
  return httpRequest.get('top/playlist', params);
};

export const getPlaylist = id => {
  return httpRequest.get('playlist/detail', { id });
};

export const getSongDetail = ids => {
  return httpRequest.get('song/detail', { ids });
};

export const getSongUrl = id => {
  return httpRequest.get('song/url', { id });
};

export const getLyric = id => {
  return httpRequest.get('lyric', { id });
};
