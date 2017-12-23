import { 
  CHANGE_HEADER,
  RESET_HEADER,
  APP_NAME,
  SIDEBAR_TOGGLE,
  REDIRECT,
  LOGIN,
  SIGNUP,
  POLL_CREATED,
  CIRCLE_CREATED,
  EDIT_PROFILE
} from '../actions';

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
    case REDIRECT: {
      return { ...state, redirect: null}
    }
    case POLL_CREATED:
    case CIRCLE_CREATED:
    case EDIT_PROFILE:
    case LOGIN:
    case SIGNUP: {
      return { ...state, redirectTo: action.redirectTo }
    }
    default:{
      // This resets this state. For things like the name and sidebar
      return initialState;
    }
  }
}
