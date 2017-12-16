import { LOGIN, REGISTER, LOGOUT, ASYNC_START, ASYNC_END } from "./actions/actionTypes";
import agent from "./agent";

export const localStorageMiddleware = store => next => action => {
  if (action.type === LOGIN || action.type === REGISTER) {
    // Would change this later to JWT
    localStorage.setItem('jwt', action.payload._id);
    agent.setToken(action.payload._id);
  }
  if (action.type === LOGOUT) {
    localStorage.setItem('jwt', '');
    agent.setToken(null);
  }
  return next(action);
}

export const promiseMiddleware = store => next => action => {
  if (isPromise(action.payload)) {
    store.dispatch({ type: ASYNC_START, subtype: action.type });

    const currentView = store.getState().viewChangeCounter;
    const skipTracking = action.skipTracking;

    action.payload.then(
      res => {
        const currentState = store.getState()
        if (!skipTracking && currentState.viewChangeCounter !== currentView) {
          return
        }
        console.log('RESULT', res);
        action.payload = res;
        store.dispatch({ type: ASYNC_END, promise: action.payload });
        store.dispatch(action);
      },
      error => {
        const currentState = store.getState()
        if (!skipTracking && currentState.viewChangeCounter !== currentView) {
          return
        }
        console.log('ERROR', error);
        action.error = true;
        action.payload = error.response && error.response.body;
        if (!action.skipTracking) {
          store.dispatch({ type: ASYNC_END, promise: action.payload });
        }
        store.dispatch(action);
      }
    );

    return;
  }

  next(action);
};

function isPromise(v) {
  return v && typeof v.then === 'function';
}