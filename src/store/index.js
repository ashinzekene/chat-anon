import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import reducer from '../reducers';
import { promiseMiddleware, localStorageMiddleware } from '../middleware';


export const history = createHistory();

const myRouterMiddleware = routerMiddleware(history);

const getMiddleware = () => {
  if (process.env.NODE_ENV === 'production') {
    return applyMiddleware(myRouterMiddleware, promiseMiddleware, localStorageMiddleware);
  }
  return applyMiddleware(myRouterMiddleware, createLogger(), promiseMiddleware, localStorageMiddleware);
};

export const store = createStore(reducer, composeWithDevTools(getMiddleware()));
