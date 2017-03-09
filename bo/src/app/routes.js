/**
 * Created by jilion.chen on 2/27/2017.
 */
import React from 'react';
import { Router, Route } from 'react-router';
import Login from './components/Login';
import Home from './components/Home';
import App from './components/App';
import Company from './components/Company';
import Users from './components/Users';

let routes =
    <Router>
        <Route path="/login" component={ Login } />
        <Route path="home" components={ App }>
            <Route path='company' component={ Company } />
            <Route path='users' component={ Users } />
        </Route>
    </Router>

export default routes;