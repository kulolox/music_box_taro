import { combineReducers } from 'redux';
import packageHome from './packageHome';
import songlist from './songlist';
import player from './player';

export default combineReducers({
  packageHome,
  song: songlist,
  player
});
