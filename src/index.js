import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import './index.css';
import App from './components/App';
import { store, history } from './store'
import registerServiceWorker from './registerServiceWorker';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import 'semantic-ui-css/semantic.min.css';

ReactDOM.render((
  <Provider store={ store } >
    <ConnectedRouter history={ history }>
      <Switch>
        <Route path="/" component={App} />
      </Switch>
    </ConnectedRouter>
  </Provider>
), document.getElementById('root'));
registerServiceWorker();
