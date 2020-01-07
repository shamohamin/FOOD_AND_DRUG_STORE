import { createStore , combineReducers , compose , applyMiddleware } from "redux";
import { asyncMiddelware } from "./AsyncMiddelware";
import { LoginReducer } from "./LoginReducer";
import { ModelReducer } from './ModelReducer';
import { MultiActionMiddelware } from './MultiActionMiddelware';
import { createBrowserHistory } from "history";
import { connectRouter , routerMiddleware } from "connected-react-router";

export const history = createBrowserHistory() ;

// const persistConfig = {
//     key : 'root',
//     storage
// }

const combinedReducer = combineReducers({
    router : connectRouter(history),
    modelReducer : ModelReducer ,
    loginReducer : LoginReducer
})

export default createStore(combinedReducer , compose(
    applyMiddleware(MultiActionMiddelware),
    applyMiddleware(asyncMiddelware),
    applyMiddleware(routerMiddleware(history)),
    // window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()
))
