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
import Colour from './components/Colour';
import Size from './components/Size';
import Category from './components/Category';
import Tort from './components/Tort';
import TmpProducts from './components/TmpProducts'
import FormalProducts from './components/FormalProducts'

let routes =
    <Router>
        <Route path="/login" component={ Login } />
        <Route path="home" components={ App }>
            <Route path='companies' component={ Company } />
            <Route path='users' component={ Users } />
            <Route path='addUser' component={ AddUser } />
            <Route path='colours' component={ Colour } />
            <Route path='sizes' component={ Size } />
            <Route path='categories' component={ Category } />
            <Route path='torts' component={ Tort } />
            <Route path='tmpProducts' component={ TmpProducts } />
            <Route path='formalProducts' component={ FormalProducts } />
        </Route>
    </Router>

export default routes;