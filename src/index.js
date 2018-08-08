import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory, Redirect } from 'react-router';

import App from './containers/App';

import Dashboard from './views/Dashboard';

import 'primereact/resources/themes/omega/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <Router history={browserHistory}>
        <Route path='/' component={App} >
            <Redirect from="/App" to="/Dashboard" /> 
            <IndexRoute component={Dashboard} />             
            <Route path='/Dashboard' component={Dashboard} />                   
        </Route>
    </Router>,
    document.getElementById('root')
);
registerServiceWorker();
