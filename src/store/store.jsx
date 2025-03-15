import { createStore, applyMiddleware, combineReducers } from 'redux';
import {thunk} from 'redux-thunk';
import authReducer from './reducers/authReducers';
import cartReducers from './reducers/cartReducers';

const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducers,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
