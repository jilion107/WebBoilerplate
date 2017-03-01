/**
 * Created by jilion.chen on 2/27/2017.
 */
import React from 'react';
import { Router, Route } from 'react-router';
import Login from './components/Login';
import Home from './components/Home';

let routes =
    <Router>
        <Route path="/login" component={ Login } />
        <Route path="/home" components={ Home }/>
    </Router>

export default routes;