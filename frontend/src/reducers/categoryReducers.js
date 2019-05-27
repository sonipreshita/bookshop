const initialState = {
  categories: [],
  nextPageLink: false,
};


export default (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_CATEGORY_SUCCESS':
      return { categories: action.state.categories, nextPageLink: action.state.nextPageLink };
    case 'FETCH_MORE_CATEGORY_SUCCESS':
      return { categories: action.state.categories, nextPageLink: action.state.nextPageLink };
    case 'FETCH_CATEGORY_FAILURE':
      return { categories: action.state, nextPageLink: false };
    default:
      return state;
  }
};

