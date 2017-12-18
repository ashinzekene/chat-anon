import { 
  LOGIN,
  LOGOUT,
  SIGNUP,
  // REGISTER,
  // FOLLOW_USER,
  // UNFOLLOW_USER,
  PROFILE_PAGE_LOADED,
  // FROFILE_PAGE_UNLOADED,
} from '../actions/actionTypes'

export default (state = {}, action) => {
  switch (action.type) {
    case PROFILE_PAGE_LOADED:
    case SIGNUP :
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