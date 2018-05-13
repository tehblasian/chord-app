import React from 'react';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { RaisedButton } from 'material-ui';
import { TextField } from 'redux-form-material-ui';
import { MuiThemeProvider } from 'material-ui/styles';

const validate = values => {
    const { username, email, password } = values;

    let errors = {};
    username ? '' : errors.username = 'Required';
    email ? '' : errors.email = 'Required';
    password ? '' : errors.password = 'Required';

    return errors;
}

const styles = { 
    fields: { marginBottom: '5px', width: '80%' },
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
                    style={styles.fields}
                    floatingLabelFixed={true}
                    floatingLabelStyle={styles.floatingLabelStyle}
                    floatingLabelText="Username"
                    errorStyle={styles.errors}
                    hintText="i.e. jazzbrah"/>
                <Field
                    name="email"
                    component={TextField}
                    style={styles.fields}
                    floatingLabelFixed={true}
                    floatingLabelStyle={styles.floatingLabelStyle}
                    floatingLabelText="Email"
                    errorStyle={styles.errors}
                    hintText="i.e. example@example.com"/>
                <Field
                    name="password"
                    component={TextField}
                    style={styles.fields}
                    floatingLabelFixed={true}
                    floatingLabelStyle={styles.floatingLabelStyle}
                    errorStyle={styles.errors}
                    floatingLabelText="Password"/>
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
