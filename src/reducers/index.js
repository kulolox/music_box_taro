import { combineReducers } from 'redux';
import home from './home';
import songlist from './songlist';
import player from './player';

export default combineReducers({
  home,
  song: songlist,
  player
});
