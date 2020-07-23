import { SET_PLAYER_DATA } from '@/constants/player';

const INITIAL_STATE = {
  data: []
};

export default function song(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_PLAYER_DATA:
      return {
        ...state,
        data: action.data
      };

    default:
      return state;
  }
}
