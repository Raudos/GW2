export default (state, action) => {
  switch (action.type) {
    case 'addKey':
      return action.data.key;
    case 'removeKey':
      return false;
  default:
    return state;
  }
};
