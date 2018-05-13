export const validateLoginRegisgration = values => {
    const { username, email, password } = values;

    let errors = {};
    username ? '' : errors.username = 'Required';
    email ? '' : errors.email = 'Required';
    password ? '' : errors.password = 'Required';

    return errors;
}
