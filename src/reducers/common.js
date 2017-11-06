import { CHANGE_HEADER, RESET_HEADER, APP_NAME } from '../actions/actionTypes';

const initialState = {
  header: { title: APP_NAME, back: false },
}

export default (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_HEADER: {
      return Object.assign({}, state, { header: action.header });
    }
    case RESET_HEADER: {
      return Object.assign({}, state, { header: initialState.header });
    }
    default:{
      return initialState;
    }
  }
}
