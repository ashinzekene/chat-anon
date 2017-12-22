import circle from './circle';
import circleList from './circleList';
import poll from './poll';
import pollList from './pollList';
import user from './user'
import circles from './circles'
import common from './common'
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

export default combineReducers({
  router: routerReducer,
  pollList,
  circleList,
  circle,
  circles,
  poll,
  user,
  common,
})


/*
*
*
POLLS []
CIRCLES []

SELECTED_USER {}
CIRCLE  {
  FELLOWS: []
  ADMINS: []
  INVITES: []
  POLLS: []
}
POLL {
  OPTIONS
}
USER  {
  FOLLOWERS: [],
  FOLLOWING: [],
  CIRCLES: [],
  POLLS: []
}
*/