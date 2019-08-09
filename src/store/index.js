import { createBrowserHistory } from 'history'
import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import { routerMiddleware, connectRouter } from 'connected-react-router'
import { reducer as formReducer } from 'redux-form'

export const history = createBrowserHistory()

const middleware = routerMiddleware(history)

const middlewares = [middleware]

const enhancers = [applyMiddleware(...middlewares)]

const composedEnhancers =
  process.env.NODE_ENV !== 'production' && typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE_
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE_
    : compose

export const store = createStore(
  combineReducers({
    form: formReducer,
    router: connectRouter(history),
  }),
  composedEnhancers(...enhancers),
)
