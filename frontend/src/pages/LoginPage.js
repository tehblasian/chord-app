import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from '../components/LoginForm';

class LoginPage extends React.Component {
    render() {
        return (
            <div className="login-page-container">
                <h1 className="header-large" style={{ margin: '0.5em auto' }}>Log In</h1>
                <LoginForm/>
                <h1 className="sign-up-or-join">New to Voice It? <Link to="/register">Create an account</Link></h1>
            </div>
        )
    }
}

export default LoginPage;
