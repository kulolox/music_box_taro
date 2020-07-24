import { SET_PLAYER_DATA, SET_AUDIO_INSTANCE } from '@/constants/player';

const INITIAL_STATE = {
  data: [],
  currentid: '',
  audio: null
};

export default function song(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_PLAYER_DATA:
      return {
        currentId: action.data.id,
        data: action.data.data
      };
    case SET_AUDIO_INSTANCE:
      return {
        ...state,
        audio: action.data
      };

    default:
      return state;
  }
}
