import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import posts from './reducers'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import loggerMiddleware from 'redux-logger'
import {BrowserRouter} from 'react-router-dom'
import combineReducers from './reducers';
import 'semantic-ui-css/semantic.min.css';



const store = createStore(
  combineReducers,
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
  )
)

console.log(store)


ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter><App
  /></BrowserRouter>
  </Provider>, document.getElementById('root'));
registerServiceWorker();
