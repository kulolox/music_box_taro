import { combineReducers } from 'redux';
import home from './home';
import songlist from './songlist';

export default combineReducers({
  home,
  song: songlist
});
