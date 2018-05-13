import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { RaisedButton } from 'material-ui';
import { TextField } from 'redux-form-material-ui';
import { MuiThemeProvider } from 'material-ui/styles';

import { validateLoginRegisgration as validate } from '../util/AuthUtil';

const styles = { 
    container: { marginBottom: '5px', width: '80%' },
    input: { WebkitBoxShadow: '0 0 0 1000px white inset' },
    floatingLabelStyle: { fontSize: '20px', top: '34px' },
    errors: { textAlign: 'right' },
};

let LoginForm = props => {
    const { onSubmit, handleSubmit, invalid, submitting } = props;
    return (
        <MuiThemeProvider>
            <form className="register-form" onSubmit={handleSubmit(onSubmit)}>
                <Field
                    name="username"
                    component={TextField}
                    style={styles.container}
                    inputStyle={styles.input}
                    fullWidth={true}
                    floatingLabelFixed={true}
                    floatingLabelStyle={styles.floatingLabelStyle}
                    floatingLabelText="Username"
                    errorStyle={styles.errors}/>
                <Field
                    name="password"
                    component={TextField}
                    style={styles.container}
                    type="password"
                    inputStyle={styles.input}
                    fullWidth={true}
                    floatingLabelFixed={true}
                    floatingLabelStyle={styles.floatingLabelStyle}
                    floatingLabelText="Password"
                    errorStyle={styles.errors}/>
                <RaisedButton 
                    type="submit"
                    backgroundColor="#4CAF50"
                    label="Log in"
                    labelColor="#ffffff"
                    style={{ marginTop: '1em', width: '80%' }}
                    disabled={invalid || submitting}/>
                
            </form>
        </MuiThemeProvider>
    )
}

LoginForm = reduxForm({
    form: 'LoginForm',
    validate,
})(LoginForm);

export default LoginForm;
