import React from 'react';
import { Link } from 'react-router-dom';
import RegisterForm from '../components/RegisterForm';

class RegisterPage extends React.Component {
    render() {
        return (
            <div className="register-page-container">
                <h1 className="header-large" style={{ margin: '0.5em auto' }}>Sign up</h1>
                <RegisterForm/>
                <h1 className="sign-up-or-join">Already have an account? <Link to="/login">Log In</Link></h1>
            </div>
        )
    }
}

export default RegisterPage;
