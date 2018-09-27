import { combineReducers } from 'redux';
import auth from './auth';
import skills from './skills';
import search from './search';

export default combineReducers({
  auth,
  skills,
  search,
});