import httpRequest from './http';

export const getBanner = type => {
  return httpRequest.get('banner', { type });
};

// 获取歌单
export const getAlbumList = params => {
  return httpRequest.get('top/playlist', params);
};

// 获取歌单详情
export const getAlbumDetail = id => {
  return httpRequest.get('playlist/detail', { id });
};

/**
 * 获取歌曲列表
 * @param {string} ids
 */
export const getSongList = ids => {
  return httpRequest.get('song/detail', { ids });
};

/**
 * 获取歌曲播放链接
 * @param {number} id
 */
export const getSongUrl = id => {
  return httpRequest.get('song/url', { id });
};


/**
 * 获取歌曲歌词
 * @param {number} id
 */ 
export function getSongLyric(id){
  return request.get(`${baseUrl}/lyric?id=${id}`);
}
