import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import storage from 'redux-persist/lib/storage';
import { version } from '../package.json';
import { App } from './components/App';
import decodeUrl from './decodeUrl';
import './index.scss';
import reducer from './reducers';
import * as serviceWorker from './serviceWorker';

if (process.env.NODE_ENV === 'production') {
  decodeUrl();
}

const persistedReducer = persistReducer({
  key: 'root',
  storage,
  version: 1
}, reducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
    }
  })
});
const persistor = persistStore(store);

ReactDOM.render(
  <React.StrictMode>
    <span className="version" hidden>
      {version}-{process.env.NODE_ENV}
    </span>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
