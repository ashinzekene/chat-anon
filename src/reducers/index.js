import circle from './circle';
import circleList from './circleList';
import poll from './poll';
import pollList from './pollList';
import user from './user'
import common from './common'
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

export default combineReducers({
  router: routerReducer,
  pollList,
  circleList,
  circle,
  poll,
  user,
  common,
})