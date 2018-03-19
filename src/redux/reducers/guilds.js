
export default (state, action) => {
  switch (action.type) {
    case 'downloadGuildsList':
      return {
        ...state,
        list: action.data
      };
    case 'downloadGuildsDetails':
      return {
        ...state,
        [action.data.id]: action.data
      };
  default:
    return state;
  }
};
