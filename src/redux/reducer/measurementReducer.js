const initialState = {
  data: [],
  isProcess: false,
};

// eslint-disable-next-line no-undef
export default measurementReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case 'process-get-measurement':
      return {...state, data: null, isProcess: true};
    case 'success-get-measurement':
      return {...state, data: payload, isProcess: false};
    case 'failed-get-measurement':
      return {...state, data: null, isProcess: false};
    default:
      return state;
  }
};


