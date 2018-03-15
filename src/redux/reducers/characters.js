
export default (state, action) => {
  switch (action.type) {
    case 'downloadCharactersList':
      return {
        ...state,
        list: action.data
      };
  default:
    return state;
  }
};
