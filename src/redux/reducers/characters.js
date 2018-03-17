
export default (state, action) => {
  switch (action.type) {
    case 'downloadCharactersList':
      return {
        ...state,
        list: action.data
      };
    case 'downloadCharactersDetails':
      return {
        ...state,
        [action.data.name]: action.data
      };
  default:
    return state;
  }
};
