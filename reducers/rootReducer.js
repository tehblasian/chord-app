import { combineReducers } from 'redux'
import keyReducer from './keyReducer';

const rootReducer = combineReducers({
    keys: keyReducer
});

export default rootReducer;