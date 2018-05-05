import { combineReducers } from 'redux'
import KeyReducer from './KeyReducer';

const RootReducer = combineReducers({
    keyboard: KeyReducer
});

export default RootReducer;
