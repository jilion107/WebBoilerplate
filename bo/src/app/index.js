/**
 * Created by jilion.chen on 2/27/2017.
 */
import React from 'react';
import { Router, Route } from 'react-router';
import ReactDOM from 'react-dom';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import routes from './routes';

let history = createBrowserHistory();
ReactDOM.render(
    <Router history={history}>
        {routes}
    </Router>,
    document.getElementById('app')
);