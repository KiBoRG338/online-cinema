import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import Reducers from './Reducers';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk'

const composeEnhancers = composeWithDevTools({});
const sagaMiddleware = createSagaMiddleware();

const store = createStore(
    Reducers, 
    composeEnhancers(applyMiddleware(thunk, sagaMiddleware))
);

// sagaMiddleware.run(todoSaga)
export default store;