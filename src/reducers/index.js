import circle from './circle';
import circleList from './circleList';
import poll from './poll';
import pollList from './pollList';
import user from './user'
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

export default combineReducers({
  router: routerReducer,
  circle,
  circleList,
  poll,
  user,
  pollList
})