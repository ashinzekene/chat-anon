import { 
  POLL_CREATED, 
  POLL_DELETED,
  POLL_LIST_LOADED,
  POLL_LIST_UNLOADED
} from "../action/pollTypes";

export default (state = [], action) => {
  switch (action.type) : {
    case POLL_LIST_LOADED: {
      return action.payload;
    }
    case POLL_LIST_UNLOADED:{
      return {};
    }
    default: {
      return state;
    }
  }
}