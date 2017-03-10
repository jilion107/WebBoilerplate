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
import AddUser from './components/AddUser';
import Color from './components/Color';
import Size from './components/Size';
import Category from './components/Category';
import Tort from './components/Tort';

let routes =
    <Router>
        <Route path="/login" component={ Login } />
        <Route path="home" components={ App }>
            <Route path='companies' component={ Company } />
            <Route path='users' component={ Users } />
            <Route path='addUser' component={ AddUser } />
            <Route path='colors' component={ Color } />
            <Route path='torts' component={ Tort } />
        </Route>
    </Router>

export default routes;