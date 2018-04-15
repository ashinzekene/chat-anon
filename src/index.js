import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import App from './components/App.jsx';
import { store, history } from './store'
// import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter, Route } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import 'semantic-ui-css/semantic.min.css';
import './index.css';

ReactDOM.render((
  <Provider store={ store } >
    <ConnectedRouter history={ history }>
      <BrowserRouter basename="/">
        <Route path="" component={App} />
      </BrowserRouter>
    </ConnectedRouter>
  </Provider>
), document.getElementById('root'));
// registerServiceWorker();
