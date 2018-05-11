import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { RaisedButton } from 'material-ui';
import { TextField } from 'redux-form-material-ui';
import { MuiThemeProvider } from 'material-ui/styles';

let LoginForm = props => {
    const { handleSubmit, pristine, submitting } = props;
    return (
        <MuiThemeProvider>
            <form className="register-form" onSubmit={handleSubmit}>
                <Field
                    name="username"
                    component={TextField}
                    style={{ width: '80%' }}
                    fullWidth={true}
                    floatingLabelFixed={true}
                    floatingLabelStyle={{ fontSize: '20px', top: '34px' }}
                    floatingLabelText="Username"/>
                <Field
                    name="password"
                    component={TextField}
                    style={{ width: '80%' }}
                    fullWidth={true}
                    floatingLabelFixed={true}
                    floatingLabelStyle={{ fontSize: '20px', top: '34px' }}
                    floatingLabelText="Password"/>
                <RaisedButton 
                    label="Log in"
                    labelColor="white"
                    style={{ marginTop: '1em', width: '80%' }}
                    disabled={pristine || submitting}/>
                
            </form>
        </MuiThemeProvider>
    )
}

LoginForm = reduxForm({
    form: 'LoginForm',
})(LoginForm);

export default LoginForm;
