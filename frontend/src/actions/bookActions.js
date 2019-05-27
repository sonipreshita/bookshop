import * as actionTypes from './actionTypes';
import Axios from 'axios';
import cookie from 'react-cookies';
import $ from 'jquery';

export const fetchCategoriesSuccess = (category) => {
  const categorydata = {
    categories: category.data,
    nextPageLink: category.meta.nextPageLink
  };
  return {
    type: actionTypes.FETCH_CATEGORY_SUCCESS,
    state: categorydata
  };
};

export const fetchMoreCategoriesSuccess = (category, moreCategory) => {
  const moreCategoryData = {
    categories: category.concat(moreCategory.data),
    nextPageLink: moreCategory.meta.nextPageLink
  };
  return {
    type: actionTypes.FETCH_MORE_CATEGORY_SUCCESS,
    state: moreCategoryData
  };
};

export const fetchMoreMoviesFailure = (err) => {
  return {
    state: err,
    type: actionTypes.FETCH_CATEGORY_FAILURE,
  };
};

export const createBookSuccess = (book) => {
  return {
    type: actionTypes.CREATE_BOOK_SUCCESS,
    book
  };
};
export const createUserSuccess = (status) => {
  return {
    type: actionTypes.CREATE_USER_SUCCESS,
    status
  };
};

export const loginUserSuccess = (status) => {
  return {
    type: actionTypes.LOGIN_USER_SUCCESS,
    status
  };
};

export const getdeliveryaddresssuccess = (address) => {
  return {
    type: actionTypes.GET_ADDRESS_SUCCESS,
    state: address.data
  };
};

export const fetchBookByIdSuccess = (book) => {
  return {
    type: actionTypes.FETCH_BOOK_BY_ID_SUCCESS,
    book
  };
};

export const fetchBookBycategoryIdSuccess = (book) => {
  return {
    type: actionTypes.FETCH_CATEGORY_BY_ID_SUCCESS,
    book
  };
};

export const BooksHighToLowSuccess = (book) => {
  return {
    type: actionTypes.BOOKS_HIGHTOLAW_SUCCESS,
    book
  };
};

export const BooksLowToHighSuccess = (book) => {
  return {
    type: actionTypes.BOOKS_LOWTOHIGH_SUCCESS,
    book
  };
};

export const LatestBooksSuccess = (book) => {
  return {
    type: actionTypes.LATEST_BOOKS_SUCCESS,
    book
  };
};

export const searchBookSuccess = (book) => {
  return {
    type: actionTypes.SEARCH_BOOK_SUCCESS,
    book
  };
};

export const fetchAllCategoriesSuccess = (allcategory) => {
  return {
    type: actionTypes.ALL_CATEGORY_SUCCESS,
    allcategory
  };
};

export const getCategoryNameSuccess = (category) => {
  return {
    type: actionTypes.GET_CATEGORYNAME_SUCCESS,
    category
  };
};

export const getOrderItemsSuccess = (data) => {
  return {
    type: actionTypes.GET_ORDERITEM_SUCCESS,
    data
  };
};

export const SearchBook = () => {
  let str = window.location.href;
  let strArray = str.split('/');
  let getBookQuery = strArray[strArray.length - 1];
  console.log('getBookQuery',getBookQuery)
  return (dispatch) => {
    return Axios.get(`${process.env.REACT_APP_API_ENDPOINT}api/search/book/` + getBookQuery)
      .then(response => {
        dispatch(searchBookSuccess(response.data));
      })
      .catch(error => {
        throw (error);
      });
  };
};

export const BooksHighToLow = (cate_id) => {
  return (dispatch) => {
    return Axios.get(`${process.env.REACT_APP_API_ENDPOINT}api/books/hightolow/` + cate_id)
      .then(response => {
        dispatch(BooksHighToLowSuccess(response.data));
      })
      .catch(error => {
        throw (error);
      });
  };
};

export const BooksLowToHigh = (cate_id) => {
  return (dispatch) => {
    return Axios.get(`${process.env.REACT_APP_API_ENDPOINT}api/books/lowtohigh/` + cate_id)
      .then(response => {
        dispatch(BooksLowToHighSuccess(response.data));
      })
      .catch(error => {
        throw (error);
      });
  };
};

export const LatestBooks = (cate_id) => {
  return (dispatch) => {
    return Axios.get(`${process.env.REACT_APP_API_ENDPOINT}api/books/latest/` + cate_id)
      .then(response => {
        dispatch(LatestBooksSuccess(response.data));
      })
      .catch(error => {
        throw (error);
      });
  };
};

export const fetchCategories = () => {
  return (dispatch) => {
    return Axios.get(`${process.env.REACT_APP_API_ENDPOINT}api/category`)
      .then(response => {
        dispatch(fetchCategoriesSuccess(response.data));
        //dispatch(fetchBookByCategoryID());
      })
      .catch(error => {
        throw (error);
      });
  };
};

export const getCategoryName = (id) => {
  return (dispatch) => {
    return Axios.get(`${process.env.REACT_APP_API_ENDPOINT}api/get/category/` + id)
      .then(response => {
        dispatch(getCategoryNameSuccess(response.data));
      })
      .catch(error => {
        throw (error);
      });
  };
};

export const fetchAllCategories = () => {
  return (dispatch) => {
    return Axios.get(`${process.env.REACT_APP_API_ENDPOINT}api/all/category`)
      .then(response => {
        dispatch(fetchAllCategoriesSuccess(response.data));
      })
      .catch(error => {
        throw (error);
      });
  };
};

export const fetchMoreCategories = (nextPageLink) => {
  return (dispatch, getState) => {
    const { category } = getState();
    return Axios.get(nextPageLink)
      .then(response => {
        dispatch(fetchMoreCategoriesSuccess(category.categories, response.data));
      })
      .catch(error => {
        throw (error);
        //dispatch(fetchMoreCategoryFailure(error))
      });
  };
};

export const fetchBookByCategoryID = (cate_id) => {
  return (dispatch) => {
    return Axios.get(`${process.env.REACT_APP_API_ENDPOINT}api/categorybooks` + '/' + cate_id)
      .then(response => {
        dispatch(fetchBookBycategoryIdSuccess(response.data));
        dispatch(getCategoryName(cate_id));
      })
      .catch(error => {
        throw (error);
      });
  };
};

export const createBook = (book) => {
  return (dispatch) => {
    return Axios.post(`${process.env.REACT_APP_API_ENDPOINT}api/data`, book)
      .then(response => {
        dispatch(createBookSuccess(response.data));
      })
      .catch(error => {
        throw (error);
      });
  };
};

export const fetchBookById = (bookId) => {
  return (dispatch) => {
    return Axios.get(`${process.env.REACT_APP_API_ENDPOINT}api/book` + '/' + bookId)
      .then(response => {
        dispatch(fetchBookByIdSuccess(response.data));
      })
      .catch(error => {
        throw (error);
      });
  };
};

let id = 0;
export const addToCartSuccess = (item) => {
  item.id = id++;
  return {
    type: actionTypes.ADD_TO_CART_SUCCESS,
    item
  };
};

export const addToCartForLoggedUserSuccess = (item) => {
  return {
    type: actionTypes.LOGGED_USER_ADD_TO_CART_SUCCESS,
    item
  };
};

export const getyourOrderSuccess = (order) => {
  return {
    type: actionTypes.GET_ORDER_SUCCESS,
    order
  };
};

export const getPromoCodeSuccess = (coupons) => {
  return {
    type: actionTypes.GET_PROMOCODE_SUCCESS,
    coupons
  };
};

export const validPromocodeSuccess = (promocode) => {
  return {
    type: actionTypes.Valid_PROMOCODE_SUCCESS,
    promocode
  };
};

export const CancelPromocodeSuccess = () => {
  return {
    type: actionTypes.CANCEL_PROMOCODE_SUCCESS,
    state: {}
  };
};

export const getOrderdeatilSuccess = (order) => {
  return {
    type: actionTypes.GET_ORDER_DETAIL_SUCCESS,
    order
  };
};

export const cartNumber = (count) => {
  return {
    type: actionTypes.CART_UPADTE_SUCCESS,
    count
  };
};

export const getwishlistsuccess = (item) => {
  return {
    type: actionTypes.WISHLIST_SUCCESS,
    state: item.data
  };
};

export const getRatingSuccess = (rating) => {
  return {
    type: actionTypes.GET_RATING_SUCCESS,
    rating
  };
};

export const getReviewSuccess = (review) => {
  return {
    type: actionTypes.GET_REVIEW_SUCCESS,
    review
  };
};

export const addToCartForLoggedUser = (item) => {
  return (dispatch) => {
    return Axios.post(`${process.env.REACT_APP_API_ENDPOINT}api/add/cart`, item)
      .then((response) => {
        if (response.data.status === "NOK") {
          document.getElementById('already').innerHTML = response.data.result.message;
        }
        dispatch(addToCartForLoggedUserSuccess(item));
        dispatch(fetchCart());
      })
      .catch(error => {
        throw (error);
      });
  };
};

export const addToCart = (item) => {
  return (dispatch) => {
    let read = cookie.load('order');
    let sameItemStatus = false;
    if (read) {
      for (let i of read.items) {
        if (i.book_id === item.book_id) {
          sameItemStatus = true;
        }
      }
      if (sameItemStatus == false) {
        dispatch(addToCartSuccess(item));
      }
    } else {
      dispatch(addToCartSuccess(item));
    }
  };
};

export const fetchCartSuccess = (items) => {
  return {
    type: actionTypes.FETCH_CART_SUCCESS,
    items
  };
};

export const fetchCart = () => {
  let user = sessionStorage.getItem('user');
  let userName = JSON.parse(user);
  let email = (userName && userName.record.email ? userName.record.email : null);
  return (dispatch) => {
    return Axios.get(`${process.env.REACT_APP_API_ENDPOINT}api/cart/` + email)
      .then(response => {
        dispatch(fetchCartSuccess(response.data));
      })
      .catch(error => {
        throw (error);
      });
  };
};

export const createUser = (user) => {
  if (user.name === '') {
    document.getElementById("name").innerText = 'Enter your name';
  } else {
    document.getElementById("name").innerText = '';
  }
  if (user.email === '') {
    document.getElementById("email").innerText = 'Enter your email';
  } else {
    document.getElementById("email").innerText = '';
  }
  if (user.password === '') {
    document.getElementById("password").innerText = 'Password required';
  } else {
    document.getElementById("password").innerText = '';
  }
  return (dispatch) => {
    return Axios.post(`${process.env.REACT_APP_API_ENDPOINT}api/signup`, user)
      .then(response => {
        if (user.email && user.password && user.name != '') {
          if (response.data.status === 'OK') {
            sessionStorage.setItem("user", JSON.stringify(response.data.result));
            dispatch(createUserSuccess(response.data.status));
            dispatch(fetchCart());
            let cookiesItem = cookie.load('order');
            if (cookiesItem) {
              for (let i of cookiesItem.items) {
                i.user = user.email;
                dispatch(addToCartForLoggedUser(i));
                dispatch(fetchCart());
              }
            }
          } else if (response.data.status === 'NOK') {
            document.getElementById("email").innerText = 'Please enter valid email';
          }
          else {
            document.getElementById("email").innerText = 'This email is already used ';
          }
        }
      })
      .catch(error => {
        throw (error);
      });
  };
};

export const updatePassword = (details) => {

  if (details.oldpassword === '') {
    document.getElementById("oldpassword").innerText = 'Enter your old password';
  } else {
    document.getElementById("oldpassword").innerText = '';
  }
  if (details.newpassword === '') {
    document.getElementById("newpassword").innerText = 'Enter new password';
  } else {
    document.getElementById("newpassword").innerText = '';
  }
  if (details.confirmpassword === '') {
    document.getElementById("confirmpassword").innerText = 'Confirm Password ';
  } else {
    document.getElementById("confirmpassword").innerText = '';
  }

  let user = sessionStorage.getItem('user');
  let userName = JSON.parse(user);
  let userId = (userName && userName.record._id ? userName.record._id : null);
  return (dispatch) => {
    return Axios.post(`${process.env.REACT_APP_API_ENDPOINT}api/update-password/` + userId, details)
      .then(response => {
        if (details.confirmpassword && details.newpassword && details.oldpassword != '') {
          if (response.data.status === 'OK') {
            dispatch(GetDeliverAddress());
            document.getElementById("success").innerText = 'Your password has been changed';
          } else {
            let errmsg = response.data.result.message.confirm_password || response.data.result.message.oldpassword;
            document.getElementById("success").innerText = errmsg;
          }
        }
      })
      .catch(error => {
        throw (error);
      });
  };

};

export const loginUser = (login) => {
  if (login.email === '') {
    document.getElementById("loginemail").innerText = 'Email is required';
  } else {
    document.getElementById("loginemail").innerText = '';
  }
  if (login.password === '') {
    document.getElementById("loginpassword").innerText = 'Password is required';
  } else {
    document.getElementById("loginpassword").innerText = '';
  }
  return (dispatch) => {
    return Axios.post(`${process.env.REACT_APP_API_ENDPOINT}api/login`, login)
      .then(response => {
        if (login.password && login.email != '') {
          if (response.data.status === 'OK') {
            sessionStorage.setItem("user", JSON.stringify(response.data.result));
            dispatch(loginUserSuccess(response.data.status));
            dispatch(fetchCart());
            let cookiesItem = cookie.load('order');
            if (cookiesItem) {
              for (let i of cookiesItem.items) {
                i.user = login.email;
                dispatch(addToCartForLoggedUser(i));
                dispatch(fetchCart());
              }
            }
          } else {
            dispatch(loginUserSuccess(response.data.result.message));
          }
        }
      })
      .catch(error => {
        throw (error);
      });
  };
};

export const removeItemFromCart = (items, id) => {
  return (dispatch) => {
    cookie.remove('order', { path: '/' });
    let orderItem = [];
    for (let i of items.items) {
      if (i.id !== id) {
        orderItem.push(i);
      }
    }
    let expires = new Date();
    expires.setDate(expires.getDate() + 14);
    if (orderItem.length > 0) {
      dispatch(cartNumber(orderItem.length));
      cookie.save('order',
        {
          items: orderItem
        },
        {
          path: '/',
          expires,
          maxAge: 1000
        });
    }
    //dispatch(cartNumber(orderItem.length));
  };
};

export const removeItemFromCartForLoggedUser = (items, cart_id) => {
  return (dispatch) => {
    return Axios.delete(`${process.env.REACT_APP_API_ENDPOINT}api/cart/` + cart_id)
      .then(response => {
        if (response.data.status === 'OK') {
          dispatch(fetchCart());
        }
      })
      .catch(error => {
        throw (error);
      });
  };
};

export const orderQuantityForLoggedUser = (count, id) => {
  let data = { count: count };
  return (dispatch) => {
    return Axios.put(`${process.env.REACT_APP_API_ENDPOINT}api/update/cart/` + id, data)
      .then(response => {
        if (response.data.status === 'OK') {
          dispatch(fetchCart());
        }
      })
      .catch(error => {
        throw (error);
      });
  };
};

export const orderQuantity = (items, count, id) => {
  return () => {
    cookie.remove('order', { path: '/' });
    let quantityOfItem = [];
    for (let i of items.items) {
      if (i.id === id) {
        i.quantity = count;
      }
      quantityOfItem.push(i);
    }
    let expires = new Date();
    expires.setDate(expires.getDate() + 14);
    cookie.save('order',
      {
        items: quantityOfItem
      },
      {
        path: '/',
        expires,
        maxAge: 1000
      });
  };
};

export const confirmOrder = (details, props) => {
  let user = sessionStorage.getItem('user');
  let userName = JSON.parse(user);
  let user_id = (userName && userName.record._id ? userName.record._id : null);
  let orderItems = JSON.parse(sessionStorage.getItem('orderItems'));
  return (dispatch) => {
    return Axios.post(`${process.env.REACT_APP_API_ENDPOINT}api/order/` + user_id, details)
      .then((response) => {
        if (response.data.status === 'OK') {
          for (let i of orderItems.order) {
            dispatch(removeItemFromCartForLoggedUser(i, i._id));
          }
          sessionStorage.removeItem('Address');
          sessionStorage.removeItem('orderItems');
          sessionStorage.removeItem('proceedData');
          sessionStorage.removeItem('promocode');
          sessionStorage.removeItem('result');
          props.router.push('/orderdetails');
          dispatch(yourOrder());
        } else {
          document.getElementById("items").innerHTML = "Please Select any option";
          // props.router.push('/checkout');
        }
      })
      .catch(error => {
        throw (error);
      });
  };
};

export const yourOrder = () => {
  let user = sessionStorage.getItem('user');
  let userName = JSON.parse(user);
  let user_id = (userName && userName.record._id ? userName.record._id : null);
  return (dispatch) => {
    return Axios.get(`${process.env.REACT_APP_API_ENDPOINT}api/user/order/` + user_id)
      .then((response) => {
        if (response.data.status === 'OK') {
          dispatch(getyourOrderSuccess(response.data.result.data));
        }
      })
      .catch(error => {
        throw (error);
      });
  };
};

export const OrderDetails = (orderId) => {
  return (dispatch) => {
    return Axios.get(`${process.env.REACT_APP_API_ENDPOINT}api/order/` + orderId)
      .then((response) => {
        if (response.data.status === 'OK') {
          dispatch(getOrderdeatilSuccess(response.data.result.data));
        }
      })
      .catch(error => {
        throw (error);
      });
  };
};

export const CancelItem = (orderId, itemId) => {
  return (dispatch) => {
    return Axios.get(`${process.env.REACT_APP_API_ENDPOINT}api/update/item_status/` + orderId + '/' + itemId)
      .then((response) => {
        if (response.data.status === 'OK') {
          dispatch(yourOrder());
        }
      })
      .catch(error => {
        throw (error);
      });
  };
};

export const CancelOrder = (orderId) => {
  return (dispatch) => {
    return Axios.get(`${process.env.REACT_APP_API_ENDPOINT}api/update/order_status/` + orderId)
      .then((response) => {
        if (response.data.status === 'OK') {
          dispatch(yourOrder());
        }
      })
      .catch(error => {
        throw (error);
      });
  };
};

export const ReturnOrder = (orderId) => {
  return (dispatch) => {
    return Axios.get(`${process.env.REACT_APP_API_ENDPOINT}api/return_order/` + orderId)
      .then((response) => {
        if (response.data.status === 'OK') {
          dispatch(yourOrder());
        }
      })
      .catch(error => {
        throw (error);
      });
  };
};

export const ReturnItem = (orderId, itemId) => {
  return (dispatch) => {
    return Axios.get(`${process.env.REACT_APP_API_ENDPOINT}api/return_item/` + orderId + '/' + itemId)
      .then((response) => {
        if (response.data.status === 'OK') {
          dispatch(yourOrder());
        }
      })
      .catch(error => {
        throw (error);
      });
  };
};

export const DeliverAddress = (address) => {
  let user = sessionStorage.getItem('user');
  let userName = JSON.parse(user);
  let user_id = (userName && userName.record._id ? userName.record._id : null);
  return (dispatch) => {
    return Axios.post(`${process.env.REACT_APP_API_ENDPOINT}api/deliveryaddress/` + user_id, address)
      .then((response) => {
        if (response.data.status === 'OK') {
          dispatch(GetDeliverAddress());
        }
      })
      .catch(error => {
        throw (error);
      });
  };
};

export const GetDeliverAddress = () => {
  let user = sessionStorage.getItem('user');
  let userName = JSON.parse(user);
  let user_id = (userName && userName.record._id ? userName.record._id : null);
  return (dispatch) => {
    return Axios.get(`${process.env.REACT_APP_API_ENDPOINT}api/user/deliveryaddress/` + user_id)
      .then((response) => {
        if (response.data.status === 'OK') {
          dispatch(getdeliveryaddresssuccess(response.data.result));
        }
      })
      .catch(error => {
        throw (error);
      });
  };
};

export const removeAddress = (id) => {
  return (dispatch) => {
    return Axios.post(`${process.env.REACT_APP_API_ENDPOINT}api/remove/user/address/` + id)
      .then((response) => {
        if (response.data.status === 'OK') {
          dispatch(GetDeliverAddress());
        }
      })
      .catch(error => {
        throw (error);
      });
  };
};

export const updateAddress = (id, updateData) => {
  return (dispatch) => {
    return Axios.post(`${process.env.REACT_APP_API_ENDPOINT}api/update/user/address/` + id, updateData)
      .then((response) => {
        if (response.data.status === 'OK') {
          dispatch(GetDeliverAddress());
        }
      })
      .catch(error => {
        throw (error);
      });
  };
};

export const addToWishlist = (item) => {
  return (dispatch) => {
    return Axios.post(`${process.env.REACT_APP_API_ENDPOINT}api/user/wishlist`, item)
      .then((response) => {
        if (response.data.status === 'OK') {
          dispatch(getWishlist());
          document.getElementById('added').innerHTML = "Added in wish-list";
          $('#added').addClass('addedItem1');
        } else {
          document.getElementById('added').innerHTML = "";
          document.getElementById('added1').innerHTML = "Item is already in wish-list";
          $('#added1').addClass('addedItem');
        }
      })
      .catch(error => {
        throw (error);
      });
  };
};

export const getWishlist = () => {
  let user = sessionStorage.getItem('user');
  let userName = JSON.parse(user);
  let user_id = (userName && userName.record._id ? userName.record._id : null);
  return (dispatch) => {
    return Axios.get(`${process.env.REACT_APP_API_ENDPOINT}api/get/user/wishlist/` + user_id)
      .then((response) => {
        if (response.data.status === 'OK') {
          dispatch(getwishlistsuccess(response.data.result));
        }
      })
      .catch(error => {
        throw (error);
      });
  };
};

export const removeItemWishlist = (id) => {
  return (dispatch) => {
    return Axios.delete(`${process.env.REACT_APP_API_ENDPOINT}api/remove/user/wishlist/` + id)
      .then((response) => {
        if (response.data.status === 'OK') {
          dispatch(getWishlist());
        }
      })
      .catch(error => {
        throw (error);
      });
  };
};

export const OrderItems = (order, props) => {
  let promoCode = order.promocode_id ? order.promocode_id : null;
  let orders = order;
  let user = sessionStorage.getItem('user');
  let userName = JSON.parse(user);
  let user_id = (userName && userName.record._id ? userName.record._id : null);
  return (dispatch) => {
    return Axios.post(`${process.env.REACT_APP_API_ENDPOINT}api/orderItem/` + user_id, orders)
      .then((response) => {
        if (response.data.status === 'OK') {
          sessionStorage.setItem('proceedData', response.data.result._id);
          //sessionStorage.removeItem('promocode');
          if (promoCode !== null) {
            sessionStorage.setItem('promocode', promoCode);
          }
          dispatch(getWishlist());
          props.router.push('/checkout');
        }
      })
      .catch(error => {
        throw (error);
      });
  };
};

export const getOrderItems = (id, props) => {
  return (dispatch) => {
    if (id) {
      return Axios.get(`${process.env.REACT_APP_API_ENDPOINT}api/get/orderItem/` + id)
        .then((response) => {
          dispatch(getOrderItemsSuccess(response.data));
        })
        .catch(error => {
          throw (error);
        });
    } else {
      props.router.push('/');
    }
  };
};

export const PayWithCard = (token, props) => {
  return (dispatch) => {
    return Axios.post(`${process.env.REACT_APP_API_ENDPOINT}api/save-stripe-token`, token.tokenData)
      .then((response) => {
        if (response.data.response.status === "succeeded") {
          token.input.chargeid = response.data.response.id;
          dispatch(confirmOrder(token.input, props));
        }
      })
      .catch(error => {
        throw (error);
      });
  };
};

export const RefundAmount = (cancelItem) => {
  return (dispatch) => {
    return Axios.post(`${process.env.REACT_APP_API_ENDPOINT}api/refund/` + cancelItem.chargeid + '/' + cancelItem.price)
      .then((response) => {
        if (response.data.response === "succeeded") {
          dispatch(CancelItem(cancelItem.orderid, cancelItem.itemid));
        }
      })
      .catch(error => {
        throw (error);
      });
  };
};

export const RefundAmountOfOrder = (cancelOrder) => {
  return (dispatch) => {
    return Axios.post(`${process.env.REACT_APP_API_ENDPOINT}api/refund_order/` + cancelOrder.chargeid + '/' + cancelOrder.price)
      .then((response) => {
        if (response.data.response === "succeeded") {
          dispatch(CancelOrder(cancelOrder.orderid));
        }
      })
      .catch(error => {
        throw (error);
      });
  };
};

export const getPromoCode = () => {
  return (dispatch) => {
    return Axios.get(`${process.env.REACT_APP_API_ENDPOINT}api/coupon`)
      .then((response) => {
        dispatch(getPromoCodeSuccess(response.data.response));
      })
      .catch(error => {
        throw (error);
      });
  };
};

export const checkPromoCode = (promocode) => {
  return (dispatch) => {
    if (promocode != undefined) {
      return Axios.post(`${process.env.REACT_APP_API_ENDPOINT}api/valid/coupon`, promocode)
        .then((response) => {
          if (response.data.status === 'OK') {
            document.getElementById('invalid').innerHTML = '';
            dispatch(validPromocodeSuccess(response.data));
            //$("#apply").hide();
            //$('#applied,#discount').show();
          } else if (response.data.status === "NOK") {
            document.getElementById('invalid').innerHTML = response.data.message;
          }
        })
        .catch(error => {
          throw (error);
        });
    } else {
      dispatch(CancelPromocodeSuccess(promocode));
    }
  };
};

export const giveRatings = (rateData) => {
  return (dispatch) => {
    return Axios.post(`${process.env.REACT_APP_API_ENDPOINT}api/review-rating`, rateData)
      .then((response) => {
        if (response.data.status === "OK") {
          document.getElementById("ratemessage").innerHTML = response.data.message;
        } else {
          document.getElementById("ratemessage").innerHTML = '';
        }
        $('#ratemessage').fadeOut(2000);
        dispatch(showRatings(rateData.book_id));
      })
      .catch(error => {
        throw (error);
      });
  };
};

export const showRatings = (book_id) => {
  return (dispatch) => {
    return Axios.get(`${process.env.REACT_APP_API_ENDPOINT}api/get/review-rating/` + book_id)
      .then((response) => {
        dispatch(getRatingSuccess(response.data.response));
      })
      .catch(error => {
        throw (error);
      });
  };
};
