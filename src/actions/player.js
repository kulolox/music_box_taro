import { getSongUrl } from '@/api/get';
import { SET_PLAYER_DATA } from '@/constants/player';

export const setPlayer = callback => (dispatch, getState) => {
  const { song } = getState();

  const newData = song.list.filter(t => t.canPlay);

  dispatch({
    type: SET_PLAYER_DATA,
    data: newData
  });
  callback && callback();
};
