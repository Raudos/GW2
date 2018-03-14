
export default (state, action) => {
  switch (action.type) {
    case 'downloadBasicExchange':
      return action.data;
  default:
    return state;
  }
};
