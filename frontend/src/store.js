import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import RootReducer from './reducers/RootReducer'

const middleware = applyMiddleware(thunk, logger);
export default createStore(RootReducer, middleware);
