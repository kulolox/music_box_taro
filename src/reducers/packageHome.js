import { SET_PACKAGE_HOME_BANNERS, SET_PACKAGE_HOME_ALBUMS, CONCAT_PACKAGE_HOME_ALBUMS } from '@/constants/packageHome';

const INITIAL_STATE = {
  banners: [],
  albums: []
};

export default function packageHome(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_PACKAGE_HOME_BANNERS:
      return {
        ...state,
        banners: action.data
      };
    case SET_PACKAGE_HOME_ALBUMS:
      return {
        ...state,
        albums: action.data
      };
    case CONCAT_PACKAGE_HOME_ALBUMS:
      return {
        ...state,
        albums: action.data
      };
    default:
      return state;
  }
}
