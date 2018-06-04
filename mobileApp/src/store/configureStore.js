//Import Redux Store
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import {createLogger} from 'redux-logger';

// Import Reducer
import reducer from '../reducers/index.js';

import {navMiddleware} from './../components/AppNavigator.js';

const loggerMiddleware = createLogger({predicate: (getState,action) => __DEV__})

export default function configureStore(initialState) {
    return createStore(
        reducer,
        initialState,
        compose(
          applyMiddleware(thunk,loggerMiddleware,navMiddleware)
        )
    );
}