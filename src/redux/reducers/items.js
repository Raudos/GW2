
function idsIntoKeys(arr) {
  const obj = {};

  arr.forEach(item => {
    obj[item.id] = item;
  });

  return obj;
};

function manageDownloadedItems(state, action) {
  return {
    ...idsIntoKeys(action.data.items.map(item => addCharIdToItem(action.data.name, item))),
    ...updateCharacterIds(state, action)
  };
};

function updateCharacterIds(state, action) {
  const values = Object.values(state);

  const updatedStateArr = values.map(item => {
    if (action.data.charItemIds.includes(item.id)) {
      return addCharIdToItem(action.data.name, item);
    }

    return item;
  });

  return idsIntoKeys(updatedStateArr);
};

function addCharIdToItem(name, item) {
  if (item.charIds) {
    return {
      ...item,
      charIds: item.charIds.concat(name)
    };
  }

  return {
    ...item,
    charIds: [name]
  };
};

export default (state, action) => {
  switch (action.type) {
    case 'downloadCharactersDetails':
      return manageDownloadedItems(state, action);
    case 'searchPrepared':
      return {
        ...state,
        searchPrepared: true
      };
  default:
    return state;
  }
};
