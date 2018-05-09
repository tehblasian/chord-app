import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import KeyReducer from './KeyReducer';

const RootReducer = combineReducers({
    keyboard: KeyReducer,
    form: formReducer
});

export default RootReducer;
