import { CIRCLE_POLL_PAGE, POLL_PAGE_UNLOADED } from "../actions";

export default (state =[], action) => {
  switch (action.type) {
    case CIRCLE_POLL_PAGE: {
      return [ action.payload ]
    }
    case POLL_PAGE_UNLOADED: {
      return []
    }
    default: {
      return state
    }
  }
}