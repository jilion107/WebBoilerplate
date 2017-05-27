/**
 * Created by jilion.chen on 2/27/2017.
 */
import React from 'react';
import { Router, Route, Redirect } from 'react-router';
import Login from './components/Login';
import App from './components/App';
import Company from './components/Company';
import Users from './components/Users';
import AddUser from './components/AddUser';
import UpdateUser from './components/UpdateUser';
import Colour from './components/Colour';
import Size from './components/Size';
import Category from './components/Category';
import Filter from './components/Filter';
import TortWords from './components/TortWord';
import TmpProducts from './components/TmpProducts';
import FormalProducts from './components/FormalProducts';
import TortProducts from './components/TortProducts';
import FormalRemit from './components/FormalRemit';
import TortRemit from './components/TortRemit';
import AmazonCrawl from './components/AmazonCrawl';
import AmazonApiCrawl from './components/AmazonApiCrawl';

let routes =
    <Router>
        <Route path="/zhijian/index" component={ Login } />
        <Route path="/zhijian" components={ App }>
            <Route path='companies' component={ Company } />
            <Route path='users' component={ Users } />
            <Route path='addUser' component={ AddUser } />
            <Route path='updateUser/:id' component={ UpdateUser } />
            <Route path='colours' component={ Colour } />
            <Route path='sizes' component={ Size } />
            <Route path='categories' component={ Category } />
            <Route path='tortWords' component={ TortWords } />
            <Route path='filters' component={ Filter } />
            <Route path='tmpProducts' component={ TmpProducts } />
            <Route path='formalProducts' component={ FormalProducts } />
            <Route path='tortProducts' component={ TortProducts } />
            <Route path='formalRemit' component={ FormalRemit } />
            <Route path='tortRemit' component={ TortRemit } />
            <Route path='amazonCrawl' component={ AmazonCrawl } />
            <Route path='amazonApi' component={ AmazonApiCrawl } />
        </Route>
        <Redirect from="*" to="/zhijian/index" />
    </Router>

export default routes;