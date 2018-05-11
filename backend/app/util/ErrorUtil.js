import _ from 'lodash';

// From Ben Awad
const formatErrors = (e, models) => {
    if (e instanceof models.connection.ValidationError) {
        return e.errors.map(error => _.pick(error, ['path', 'message']));
    }
    return [{ path: 'unknown', message: 'Something went wrong' }];
};

export default formatErrors;
