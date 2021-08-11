import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import {lawmapReducer} from './reducers/lawmapReducer'
import createSagaMiddleware from "redux-saga";

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  combineReducers({
    lawmapReducer,
  }),
  composeEnhancers(applyMiddleware(sagaMiddleware))
);
