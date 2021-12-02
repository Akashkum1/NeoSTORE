import  Reducer from '../redux/reducer';
import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';

export const store = createStore(Reducer, applyMiddleware(logger));

export default store ;
