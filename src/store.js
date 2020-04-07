import { createStore, applyMiddleware, compose } from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';
import { persistStore, persistCombineReducers } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

let devTools = f => f
if (process.browser && window.__REDUX_DEVTOOLS_EXTENSION__) {
  devTools = window.__REDUX_DEVTOOLS_EXTENSION__()
}

console.log(reducers)

const enhancer = compose(
  applyMiddleware(ReduxThunk),
  devTools
);

const persistConfig = {
  key: 'root',
  storage
}

const persistedReducer = persistCombineReducers(persistConfig, reducers)

const store = createStore(persistedReducer, enhancer)
const persistor = persistStore(store)

export { store, persistor }