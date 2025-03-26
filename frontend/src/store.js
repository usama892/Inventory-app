import { createStore, combineReducers, applyMiddleware } from 'redux';
import  { thunk } from 'redux-thunk';
import { userReducer } from './reducers/userReducer';
import {productAddReducer} from './reducers/productReducer';
import {productListReducer} from './reducers/productReducer';
const rootReducer = combineReducers({
    user: userReducer,
    productAdd: productAddReducer,
    productList: productListReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
