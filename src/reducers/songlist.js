import { SET_SONG_INFO, SET_SONG_LIST } from '@/constants/songlist';

const INITIAL_STATE = {
  songInfo: {
    albumId: '',
    name: '',
    nickname: '',
    coverImgUrl: '',
    description: '',
    trackIds: []
  },
  list: []
};

export default function songlist(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_SONG_INFO:
      return {
        ...state,
        songInfo: action.data
      };
    case SET_SONG_LIST:
      return {
        ...state,
        list: action.data
      };

    default:
      return state;
  }
}
