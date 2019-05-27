import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Home from './components/common/HomePage';
import SearchBook from './components/book/SearchBook';
import BookPage from './components/book/BookPage';
import CartPage from './components/cart/CartPage';
import CheckOut from './components/cart/CheckOut';
import YourOrder from './components/account/YourOrder';
import Account from './components/account/Account';
import Wishlist from './components/account/Wishlist';
import ManageAddress from './components/account/ManageAddress';
import ChangePassword from './components/account/ChangePassword';
import OrderDetails from './components/cart/OrderDetails';
import Login from './components/login/Login';
import Signup from './components/login/Signup';
import BookDetailsPage from './components/book/BookDetailsPage';
import App from './components/App';

export default (
  <Route path="/" component={App} >
    <IndexRoute component={Home} />
    <Route path="/books" component={BookPage} />
    <Route path="/category/:id" component={BookPage} />
    <Route path="/book/:id" component={BookDetailsPage} />
    <Route path="/cart" component={CartPage} />
    <Route path="/login" component={Login} />
    <Route path="/checkout" component={CheckOut} />
    <Route path="/orderdetails" component={YourOrder} />
    <Route path="/accountdetails" component={Account} />
    <Route path="/account/address" component={ManageAddress} />
    <Route path="/account/changepassword" component={ChangePassword} />
    <Route path="/wishlist" component={Wishlist} />
    <Route path="/orderdetails/:id" component={OrderDetails} />
    <Route path="/book/search/:query" component={SearchBook} />
    <Route path="/signup" component={Signup} />
  </Route>
);
