import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import rootReducer from './redux/reducers/root';

const middlewares = [thunk];
const middlewareEnhancer = applyMiddleware(...middlewares);
const storeEnhancers = [middlewareEnhancer];
const composedEnhancer = composeWithDevTools(...storeEnhancers);

const store = createStore(
  rootReducer,
  composedEnhancer,
);

ReactDOM.render(<App store={store} />, document.getElementById('root'));
registerServiceWorker();
