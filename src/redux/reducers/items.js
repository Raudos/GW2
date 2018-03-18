
function idsIntoKeys(arr) {
  const obj = {};

  arr.forEach(item => {
    obj[item.id] = item;
  });

  return obj;
};

export default (state, action) => {
  switch (action.type) {
    case 'downloadCharactersDetails':
      return {
        ...state,
        ...idsIntoKeys(action.data.items)
      };
  default:
    return state;
  }
};
