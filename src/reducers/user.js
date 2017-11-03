import { 
  LOGIN,
  LOGOUT,
  // REGISTER,
  // FOLLOW_USER,
  // UNFOLLOW_USER,
  // FROFILE_PAGE_LOADED,
  // FROFILE_PAGE_UNLOADED,
} from '../actions/actionTypes'

export default (state = {}, action) => {
  switch (action.type) {
    case LOGIN: {
      return action.payload;
    }
    case LOGOUT: {
      return {};
    }
    default: {
      return state;
    }
  }
}