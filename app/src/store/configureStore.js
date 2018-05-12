//Import Redux Store
import {createStore,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';


// Import Reducer
import reducer from 'reducers';


export default function configureStore(initialState) {
    return createStore(
        reducer,
        initialState,
        applyMiddleware(thunk)
    );
}
