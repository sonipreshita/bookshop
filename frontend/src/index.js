import 'babel-polyfill';
import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import routes from './routes';
import * as bookActions from './actions/bookActions';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
//import './assests/css/custom.css';
import configureStore from './store/configureStore';

const store = configureStore();
store.dispatch(bookActions.getWishlist());
store.dispatch(bookActions.fetchCategories());
store.dispatch(bookActions.fetchAllCategories());
render(
  <Provider store={store}>
    <Router routes={routes} history={browserHistory} />
  </Provider>,
  document.getElementById('app')
);
