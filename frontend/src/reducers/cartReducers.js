import cookie from 'react-cookies';
export default (state = [], action) => {
  switch (action.type) {

    case 'ADD_TO_CART_SUCCESS': {
      const expires = new Date();
      let read = cookie.load('order');
      expires.setDate(expires.getDate() + 14);
      cookie.remove('order');
      let itemToSave;
      if (read) {
        itemToSave = [
          ...read.items,
          Object.assign({}, action.item)
        ];
      } else {
        itemToSave = [
          Object.assign({}, action.item)
        ];
      }
      cookie.save('order',
        {
          items: itemToSave
        },
        {
          path: '/',
          expires,
          maxAge: 1000
        });
    }

      return [
        ...state,
        Object.assign({}, action.item)
      ];
    default:
      return state;
  }
};
