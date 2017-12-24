import { 
  // FOLLOW_USER,
  // UNFOLLOW_USER,
  PROFILE_PAGE_LOADED,
  PROFILE_PAGE_UNLOADED,
} from '../actions'

export default (state = {}, action) => {
  switch (action.type) {
    case PROFILE_PAGE_LOADED: {
      return action.error ? state: action.payload;
    }
    case PROFILE_PAGE_UNLOADED: {
      return {};
    }
    default: {
      return state;
    }
  }
}