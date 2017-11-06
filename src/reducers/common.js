import { CHANGE_HEADER, RESET_HEADER, APP_NAME } from '../actions/actionTypes';

const initialState = {
  header: APP_NAME,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_HEADER: {
      return Object.assign({}, state, { header: action.header });
    }
    case CHANGE_HEADER: {
      return Object.assign({}, state, { header: APP_NAME });
    }
    default:{
      return initialState;
    }
  }
}
