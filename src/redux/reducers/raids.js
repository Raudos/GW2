export default (state, action) => {
  switch (action.type) {
    case 'downloadRaids':
      return action.data;
  default:
    return state;
  }
};
