import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import decode from 'jwt-decode';

export const validateLoginRegisgration = values => {
    const { username, email, password } = values;

    let errors = {};
    username ? '' : errors.username = 'Required';
    email ? '' : errors.email = 'Required';
    password ? '' : errors.password = 'Required';

    return errors;
};

export const isAuthenticated = () => {
    const token = localStorage.getItem('x-token');
    const refreshToken = localStorage.getItem('x-refresh-token');
    try {
        decode(token);
        decode(refreshToken);
    } catch (error) {
        return false
    }
    return true;
};

export const ProtectedRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            isAuthenticated() 
            ? <Component {...props}/>
            : <Redirect to={{ pathname: "/login", state: { from: props.location } }}/> 
        }
    />
);
