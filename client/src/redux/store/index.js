import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import { authReducer, fundReducer, profileReducer } from '../reducers';

const reducers = combineReducers({
    auth_state: authReducer,
    fund_state: fundReducer,
    profile_state: profileReducer
})

const initialState = {}

const middleware = [thunk]

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    reducers,
    initialState,
    composeEnhancers(applyMiddleware(...middleware))
)

export default store;