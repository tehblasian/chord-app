import React from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';

import Home from './pages/Home';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';

import './assets/styles.css';

export default class App extends React.Component{
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/create-a-voicing" component={Home}/>
                    <Route path="/register" component={RegisterPage}/>
                    <Route path="/login" component={LoginPage}/>
                </Switch>
            </BrowserRouter>
        )
    }
}
