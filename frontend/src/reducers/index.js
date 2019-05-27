// Set up your root reducer here...
import { combineReducers } from 'redux';
import category from './categoryReducers';
//import user from './userReducers';
import {
  bookReducer, categorybookReducer, userReducer, loggedUserCart, allcategory, wishListReducer,
  createUserReducer, searchBookReducer, yourOrder, cartNumber, orderdetail, userdeliveryaddress,
  couponReducer, validCouponReducer, ratingReducer, getOrderItemReducer, categoryName
} from './bookReducers';
import cart from './cartReducers';

export default combineReducers({
  //books: booksReducer,
  book: bookReducer,
  category: category,
  categoryBooks: categorybookReducer,
  cart: cart,
  cartNumber: cartNumber,
  yourOrder: yourOrder,
  allcategory: allcategory,
  orderdetail: orderdetail,
  categoryName: categoryName,
  address: userdeliveryaddress,
  searchBook: searchBookReducer,
  orderCart: loggedUserCart,
  userAuth: userReducer,
  validPromocode: validCouponReducer,
  coupons: couponReducer,
  wishList: wishListReducer,
  allRating: ratingReducer,
  getOrderItemReducer: getOrderItemReducer,
  createUserAuth: createUserReducer,
});

