import { getSongUrl } from '@/api/get';
import { SET_PLAYER_DATA } from '@/constants/player';

export const setPlayer = (id, callback) => async (dispatch, getState) => {
  const { song } = getState();

  const newData = song.list.filter(t => t.canPlay);

  const requests = newData.map(t => getSongUrl(t.id));

  const result = await Promise.all(requests);
  // console.log('result:', result);

  for (let i = 0; i < newData.length; i++) {
    newData[i].url = result[i].data.data[0].url;
  }

  dispatch({
    type: SET_PLAYER_DATA,
    data: {
      id,
      data: newData
    }
  });
  callback && callback();
};
