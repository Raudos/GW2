
export default (state, action) => {
  switch (action.type) {
    case 'downloadBasicExchange':
      return action.data;
    case 'downloadUserGems':
      return {
        ...state,
        userGemsExchange: action.data
      };
    case 'downloadUserCoins':
      return {
        ...state,
        userCoinsExchange: action.data
      };
  default:
    return state;
  }
};
