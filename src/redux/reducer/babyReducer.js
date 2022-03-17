const initialState = {
  data: null,
  isProcess: false,
};

// eslint-disable-next-line no-undef
export default babyReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case 'process-get-baby':
      return {...state, data: null, isProcess: true};
    case 'success-get-baby':
      return {...state, data: payload, isProcess: false};
    case 'failed-get-baby':
      return {...state, data: null, isProcess: false};
    default:
      return state;
  }
};
