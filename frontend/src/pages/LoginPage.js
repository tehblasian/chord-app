import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { formValueSelector, SubmissionError } from 'redux-form';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';

import LoginForm from '../components/LoginForm';

import { isAuthenticated } from '../util/AuthUtil';

const mapStateToProps = store => ({
    credentials: formValueSelector('LoginForm')(store, 'username', 'password'),
});

const loginMutation = gql`
    mutation login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            success
            token
            refreshToken
            errors {
                path
                message
            }
        }
    }  
`;
@compose(graphql(loginMutation), connect(mapStateToProps))
class LoginPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            redirectToMain: false,
            redirectToReferrer: isAuthenticated(),
        };
    }

    handleSubmit = async event => {
        const { mutate, credentials: { username, password } } = this.props;
        const { data: { login } } = await mutate({ variables: { username, password }});
        const { success, token, refreshToken, errors } = login;

        if (success) {
            localStorage.setItem('x-token', token);
            localStorage.setItem('x-refresh-token', refreshToken);
            this.setState({ redirectToMain: true });
        } else {
            let validationErrors = {};
            errors.map(({ path, message }) => validationErrors[path] = message);
            throw new SubmissionError(validationErrors);
        }
    }

    render() {
        const { redirectToMain, redirectToReferrer } = this.state;
        const { from } = this.props.location.state || { from: { pathname: '/' } };

        if (redirectToReferrer) {
            return <Redirect to={from}/>
        }
        
        return (
            <div className="login-page-container">
                <h1 className="header-large" style={{ margin: '0.5em auto' }}>Log In</h1>
                <LoginForm onSubmit={this.handleSubmit}/>
                <h1 className="sign-up-or-join">New to Voice It? <Link to="/register">Create an account</Link></h1>
                {
                    redirectToMain && <Redirect push to='/create-a-voicing'/>
                }
            </div>
        )
    }
}

export default LoginPage;
