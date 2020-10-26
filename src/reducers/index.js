import { combineReducers } from 'redux';
import home from './home';
import albums from './albums';

export default combineReducers({
  home,
  albums
});
