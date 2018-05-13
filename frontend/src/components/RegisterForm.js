import React from 'react';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { RaisedButton } from 'material-ui';
import { TextField } from 'redux-form-material-ui';
import { MuiThemeProvider } from 'material-ui/styles';

import { validateLoginRegisgration as validate } from '../util/AuthUtil';

const styles = { 
    container: { marginBottom: '5px', width: '80%' },
    input: { WebkitBoxShadow: '0 0 0 1000px white inset' },
    hint: { zIndex: 1 },
    floatingLabelStyle: { fontSize: '20px', top: '34px' },
    errors: { textAlign: 'right' },
};

let RegisterForm = props => {
    const { onSubmit, handleSubmit, invalid, submitting } = props;
    return (
        <MuiThemeProvider>
            <form className="register-form" onSubmit={handleSubmit(onSubmit)}>
                <Field
                    name="username"
                    component={TextField}
                    style={styles.container}
                    inputStyle={styles.input}
                    floatingLabelFixed={true}
                    floatingLabelStyle={styles.floatingLabelStyle}
                    floatingLabelText="Username"
                    errorStyle={styles.errors}
                    hintText="i.e. jazzbrah"
                    hintStyle={styles.hint}/>
                <Field
                    name="email"
                    component={TextField}
                    style={styles.container}
                    inputStyle={styles.input}
                    floatingLabelFixed={true}
                    floatingLabelStyle={styles.floatingLabelStyle}
                    floatingLabelText="Email"
                    errorStyle={styles.errors}
                    hintText="i.e. example@example.com"
                    hintStyle={styles.hint}/>
                <Field
                    name="password"
                    type="password"
                    component={TextField}
                    style={styles.container}
                    inputStyle={styles.input}
                    floatingLabelFixed={true}
                    floatingLabelStyle={styles.floatingLabelStyle}
                    errorStyle={styles.errors}
                    floatingLabelText="Password"
                    hintStyle={styles.hint}/>
                <RaisedButton 
                    type="submit"
                    label="Create an account"
                    labelColor="#ffffff"
                    labelStyle={{ textTransform: 'none', fontSize: '16px' }}
                    backgroundColor="#4CAF50"
                    buttonStyle={{ height: 'auto', padding: '5px' }}
                    style={{ marginTop: '1em', width: '80%' }}
                    disabled={invalid || submitting}/>
            </form>
        </MuiThemeProvider>
    )
}

RegisterForm = reduxForm({
    form: 'RegisterForm',
    validate,
})(RegisterForm);

export default RegisterForm;
