import { combineReducers } from 'redux';
import auth from './auth';
import skills from './skills';

export default combineReducers({
  auth,
  skills,
});