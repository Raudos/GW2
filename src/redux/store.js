import { createStore as createStoreFunc, applyMiddleware } from 'redux';
import logger from "redux-logger";
import thunk from "redux-thunk";

// Other
import combineReducer from 'src/redux/reducers/index';

const initialStoreObj = {
  account: null,
  apiKey: null,
  dailies: null
};

export const initialStore = initialStoreObj;

export const createStore = this.__DEV__ ?
  createStoreFunc(combineReducer, initialStoreObj, applyMiddleware(thunk, logger))
    :
  createStoreFunc(combineReducer, initialStoreObj, applyMiddleware(thunk));
