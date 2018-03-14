
export default (state, action) => {
  switch (action.type) {
    case 'downloadDailies':
      return action.data;
  default:
    return state;
  }
};
