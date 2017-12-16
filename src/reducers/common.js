import { CHANGE_HEADER, RESET_HEADER, APP_NAME, SIDEBAR_TOGGLE } from '../actions/actionTypes';

const initialState = {
  header: { title: APP_NAME, back: false },
  sidebarVisible: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_HEADER: {
      return Object.assign({}, state, { header: action.header });
    }
    case RESET_HEADER: {
      return Object.assign({}, state, { header: initialState.header });
    }
    case SIDEBAR_TOGGLE: {
      return Object.assign({}, state, { sidebarVisible: !state.sidebarVisible })
    }
    default:{
      return initialState;
    }
  }
}
