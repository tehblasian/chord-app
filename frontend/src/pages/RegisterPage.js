import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { formValueSelector, SubmissionError } from 'redux-form';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';
import RegisterForm from '../components/RegisterForm';

const mapStateToProps = store => ({
    input: formValueSelector('RegisterForm')(store, 'username', 'password', 'email'),
});

const registerMutation = gql`
    mutation register($input: RegisterInput!) {
        register(input: $input) {
            success
            errors {
                path
                message
            }
        }
    }  
`;

@compose(graphql(registerMutation), connect(mapStateToProps))
class RegisterPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            redirect: false,
        };
    }

    handleSubmit = async event => {
        const { mutate, input } = this.props;
        console.log(input)
        const { data: { register } } = await mutate({ variables: { input }});
        const { success, errors } = register;

        if (success) {
            this.setState({ redirect: true });
        } else {
            let validationErrors = {};
            errors.map(({ path, message }) => validationErrors[path] = message);
            throw new SubmissionError(validationErrors);
        }
    }

    render() {
        const { redirect } = this.state;
        return (
                <div className="register-page-container">
                    {
                        redirect && <Redirect push to="/login"/>
                    }
                    <h1 className="header-large" style={{ margin: '0.5em auto' }}>Sign up</h1>
                    <RegisterForm onSubmit={this.handleSubmit}/>
                    <h1 className="sign-up-or-join">Already have an account? <Link to="/login">Log In</Link></h1>
                </div>
        )
    }
}

export default RegisterPage;
