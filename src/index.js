import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route } from 'react-router-dom';

import createHistory from 'history/createBrowserHistory';

import App from './containers/App';

import 'primereact/resources/themes/omega/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

import registerServiceWorker from './registerServiceWorker';
const history = createHistory();

ReactDOM.render(
  <Router history={history}>
    <Route path="/" component={App} />
  </Router>,
  document.getElementById('root')
);
registerServiceWorker();
