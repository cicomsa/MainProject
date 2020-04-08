import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';

let devTools = f => f
if (process.browser && window.__REDUX_DEVTOOLS_EXTENSION__) {
  devTools = window.__REDUX_DEVTOOLS_EXTENSION__()
}

const enhancer = compose(
  applyMiddleware(ReduxThunk),
  devTools
);

let store

if (process.browser) {
  const { persistStore, persistCombineReducers } = require('redux-persist')
  const storage = require('redux-persist/lib/storage').default;

  const persistConfig = {
    key: 'root',
    storage
  }

  const persistedReducer = persistCombineReducers(persistConfig, reducers)

  store = createStore(persistedReducer, enhancer)
  store.__PERSISTOR = persistStore(store)
} else {
  const reducer = combineReducers(reducers)
  store = createStore(reducer, enhancer)
}

export default store
