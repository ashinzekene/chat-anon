import { 
  // FOLLOW_USER,
  // UNFOLLOW_USER,
  PROFILE_PAGE_LOADED,
  PROFILE_PAGE_UNLOADED,
  USER_SELECTED,
  FOLLOWERS_REQUESTED,
  FOLLOWING_REQUESTED,
  USER_CIRCLES_REQUESTED,
} from '../actions'

export default (state = {}, action) => {
  switch (action.type) {
    case USER_SELECTED: {
      return action.payload || state
    }
    case PROFILE_PAGE_LOADED: {
      return action.payload || state;
    }
    case PROFILE_PAGE_UNLOADED : {
      return {};
    }
    case USER_CIRCLES_REQUESTED: {
      return { ...state, circles: action.payload }
    }
    case FOLLOWERS_REQUESTED: {
      return { ...state, followers: action.payload }
    }
    case FOLLOWING_REQUESTED: {
      return { ...state, following: action.payload }
    }
    default: {
      return state;
    }
  }
}