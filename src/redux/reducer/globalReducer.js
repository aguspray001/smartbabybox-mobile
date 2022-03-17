const initState = {
  loader: false,
  refresh: false,
};

// eslint-disable-next-line no-undef
export default globalReducer = (state = initState, action) => {
  switch (action.type) {
    case 'show-loader': {
      {
        return {...state, loader: true};
      }
    }
    case 'hide-loader': {
      {
        return {...state, loader: false};
      }
    }
    default:
      return state;
  }
};
