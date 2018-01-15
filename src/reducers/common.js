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
  EDIT_PROFILE,
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
      return { ...state, redirectTo: null }
    }
    case POLL_CREATED: {
      return { ...state, redirectTo: "/polls" }
    }
    case CIRCLE_CREATED: {
      return { ...state, redirectTo: "/circles" }
    }
    case EDIT_PROFILE: {
      return { ...state, redirectTo: `@${action.payload.username}` || "/"  }
    }
    case LOGIN: {
      return { ...state, redirectTo: "/" }
    }
    case SIGNUP: {
      return { ...state, redirectTo: "/" }
    }
    default:{
      // This resets this state. For things like the name and sidebar INSTEAD OF: return state
      return state;
    }
  }
}
