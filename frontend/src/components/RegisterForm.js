import React from 'react';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { RaisedButton } from 'material-ui';
import { TextField } from 'redux-form-material-ui';
import { MuiThemeProvider } from 'material-ui/styles';

let RegisterForm = props => {
    const { handleSubmit, pristine, submitting } = props;
    return (
        <MuiThemeProvider>
            <form className="register-form" onSubmit={handleSubmit}>
                <Field
                    name="username"
                    component={TextField}
                    style={{ width: '80%' }}
                    floatingLabelFixed={true}
                    floatingLabelStyle={{ fontSize: '20px', top: '34px' }}
                    floatingLabelText="Username"
                    hintText="i.e. jazzbrah"/>
                <Field
                    name="email"
                    component={TextField}
                    style={{ width: '80%' }}
                    floatingLabelFixed={true}
                    floatingLabelStyle={{ fontSize: '20px', top: '34px' }}
                    floatingLabelText="Email"
                    hintText="i.e. example@example.com"/>
                <Field
                    name="password"
                    component={TextField}
                    style={{ width: '80%' }}
                    floatingLabelFixed={true}
                    floatingLabelStyle={{ fontSize: '20px', top: '34px' }}
                    floatingLabelText="Password"/>
                <RaisedButton 
                    label="Create an account"
                    labelColor="white"
                    labelStyle={{ textTransform: 'none', fontSize: '16px' }}
                    backgroundColor="#4CAF50"
                    buttonStyle={{ height: 'auto', padding: '5px' }}
                    style={{ marginTop: '1em', width: '80%' }}
                    disabled={pristine || submitting}/>
            </form>
        </MuiThemeProvider>
    )
}

RegisterForm = reduxForm({
    form: 'RegisterForm',
})(RegisterForm);

export default RegisterForm;
