
export const booksReducer = (state = [], action) => {
  switch (action.type) {
    case 'CREATE_BOOK_SUCCESS':
      return [
        ...state,
        Object.assign({}, action.book)
      ];
    case 'FETCH_BOOKS_SUCCESS':
      return action.books;
    default:
      return state;
  }
};

export const bookReducer = (state = [], action) => {
  switch (action.type) {
    case 'FETCH_BOOK_BY_ID_SUCCESS':
      return action.book;
    default:
      return state;
  }
};
export const allcategory = (state = [], action) => {
  switch (action.type) {
    case 'ALL_CATEGORY_SUCCESS':
      return action.allcategory;
    default:
      return state;
  }
};

export const categoryName = (state = [], action) => {
  switch (action.type) {
    case 'GET_CATEGORYNAME_SUCCESS':
      return action.category;
    default:
      return state;
  }
};

export const categorybookReducer = (state = [], action) => {
  switch (action.type) {
    case 'FETCH_CATEGORY_BY_ID_SUCCESS':
      return action.book;
    case 'BOOKS_HIGHTOLAW_SUCCESS':
      return action.book;
    case 'BOOKS_LOWTOHIGH_SUCCESS':
      return action.book;
    case 'LATEST_BOOKS_SUCCESS':
      return action.book;
    default:
      return state;
  }
};
export const wishListReducer = (state = [], action) => {
  switch (action.type) {
    case 'WISHLIST_SUCCESS':
      return action.state;
    default:
      return state;
  }
};

export const searchBookReducer = (state = [], action) => {
  switch (action.type) {
    case 'SEARCH_BOOK_SUCCESS':
      return action.book;
    default:
      return state;
  }
};

export const userReducer = (state = '', action) => {
  switch (action.type) {
    case 'LOGIN_USER_SUCCESS':
      return action.status;
    case 'CREATE_USER_SUCCESS':
      return action.status;
    default:
      return state;
  }
};

export const createUserReducer = (state = '', action) => {
  switch (action.type) {
    case 'CREATE_USER_SUCCESS':
      return action.status;
    default:
      return state;
  }
};

export const loggedUserCart = (state = [], action) => {
  switch (action.type) {
    case 'LOGGED_USER_ADD_TO_CART_SUCCESS':
      return [
        ...state,
        Object.assign({}, action.item)
      ];
    case 'FETCH_CART_SUCCESS':
      return action.items;
    default:
      return state;
  }
};

export const yourOrder = (state = [], action) => {
  switch (action.type) {
    case 'GET_ORDER_SUCCESS':
      return action.order;
    default:
      return state;
  }
};

export const cartNumber = (state = 0, action) => {
  switch (action.type) {
    case 'CART_UPADTE_SUCCESS':
      return action.count;
    default:
      return state;
  }
};

export const orderdetail = (state = [], action) => {
  switch (action.type) {
    case 'GET_ORDER_DETAIL_SUCCESS':
      return action.order;
    default:
      return state;
  }
};

export const userdeliveryaddress = (state = [], action) => {
  switch (action.type) {
    case 'LOGGED_USER_ADD_TO_CART_SUCCESS':
      return [
        ...state,
        Object.assign({}, action.item)
      ];
    case 'GET_ADDRESS_SUCCESS':
      return action.state;
    default:
      return state;
  }
};

export const couponReducer = (state = [], action) => {
  switch (action.type) {
    case 'GET_PROMOCODE_SUCCESS':
      return action.coupons;
    default:
      return state;
  }
};

export const validCouponReducer = (state = {}, action) => {
  switch (action.type) {
    case 'Valid_PROMOCODE_SUCCESS':
      return action.promocode.response;
    case 'CANCEL_PROMOCODE_SUCCESS':
      return action.state;
    default:
      return state;
  }
};

export const ratingReducer = (state = [], action) => {
  switch (action.type) {
    case 'GET_RATING_SUCCESS':
      return action.rating;
    default:
      return state;
  }
};

export const getOrderItemReducer = (state = {}, action) => {
  switch (action.type) {
    case 'GET_ORDERITEM_SUCCESS':
      return action.data;
    default:
      return state;
  }
};






