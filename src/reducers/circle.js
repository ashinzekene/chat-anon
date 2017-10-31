
import {
  CIRCLE_PAGE_LOADED,
  CIRCLE_PAGE_UNLOADED,
  CIRCLE_REQUEST_SENT,
  CIRCLE_FELLOW_ADDED,
  CIRCLE_FELLOW_REMOVED,
  CIRCLE_ADMIN_ADDED,
  CIRCLE_ADMIN_REMOVED,
} from '../actions/actionTypes';

function removeItem(arr, id) {
  return arr.splice(arr.findIndex(prop => prop._id === id), 1);
}

export default (state = {}, action) => {
  switch (action.type) {
    case CIRCLE_PAGE_LOADED: {
      return { state, ...action.payload };
    }
    case CIRCLE_PAGE_UNLOADED: {
      return {};
    }
    case CIRCLE_ADMIN_ADDED: {
      return { state, admin_fellows: state.admin_fellows.push(action.payload._id) };
    }
    case CIRCLE_ADMIN_REMOVED: {
      return { state, admin_fellows: removeItem(state.admin_fellows, action.payload._id) };
    }
    case CIRCLE_FELLOW_ADDED: {
      return { state, fellows: state.fellows.push(action.payload._id) };
    }
    case CIRCLE_FELLOW_REMOVED: {
      return { state, fellows: removeItem(state.fellows, action.payload._id) };
    }
    case CIRCLE_REQUEST_SENT: {
      return { state, invitees: state.invitees.push(action.payload._id) };
    }
    default: {
      return state;
    }
  }
};
