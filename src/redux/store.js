//Импортируем все Reducers
import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import thunkMiddleware from "redux-thunk";
import profileReducer from "./profileReducer";
import categoryReducer from "./categoryReducer";
import productReducer from "./productReducer";
import monthlyBestReducer from "./monthlyBestReducer";
import orderReducer from "./orderReducer";
import manufacturerReducer from "./manufacturerReducer";
import vendorsReducer from "./vendorsReducer";

//Соединяем все Reducers
let reducers = combineReducers({
    monthlyBestPage: monthlyBestReducer,
    categoryPage: categoryReducer,
    manufacturerPage: manufacturerReducer,
    profilePage: profileReducer,
    productPage: productReducer,
    orderPage: orderReducer,
    vendorsPage: vendorsReducer
})

//Middleware + расширение Redux DevTools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, /* preloadedState, */ composeEnhancers(
    applyMiddleware(thunkMiddleware)
))

//Передаем Store в Provider который в index.js
export default store

