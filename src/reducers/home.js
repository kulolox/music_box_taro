import { SET_HOME_BANNERS, SET_HOME_ALBUMS, CONCAT_HOME_ALBUMS } from '@/constants/home';

const INITIAL_STATE = {
  banners: [],
  albums: []
};

export default function home(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_HOME_BANNERS:
      return {
        ...state,
        banners: action.data
      };
    case SET_HOME_ALBUMS:
      return {
        ...state,
        albums: action.data
      };
    case CONCAT_HOME_ALBUMS:
      return {
        ...state,
        albums: action.data
      };
    default:
      return state;
  }
}
