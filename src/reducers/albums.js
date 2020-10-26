import { SET_ALBUMS } from '@/constants/albums';

const INITIAL_STATE = {
  info: {
    albumId: '',
    name: '',
    nickname: '',
    coverImgUrl: '',
    description: '',
  },
  list: []
};

export default function albums(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_ALBUMS:
      return action.data
    default:
      return state;
  }
}
