import Request from "src/reusables/request";

import { downloadCharactersList, Character } from "src/redux/actions/characters";

function downloadItem(id = "") {
  return Request({
    url: `https://api.guildwars2.com/v2/items/${typeof id === "string" ? id : `?ids=${id}`}`,
  });
};

export const downloadItemsDetails = id => {
  return (dispatch, getState) => {

  };
};

function downloadAllItems(characters, dispatch, getState) {
  Promise.all(characters.map(character => new Character(character.name, character).downloadDetails(dispatch, getState))).then(values => {
    dispatch({
      type: "searchPrepared",
      data: null
    });
  });
};

export const prepareSearch = () => {
  // Boi, sure it would be nice if api had a search option :(
  return (dispatch, getState) => {
    const characters = getState().characters;

    if (characters.list) {
      downloadAllItems(characters.list, dispatch, getState);
    } else {
      downloadCharactersList()(dispatch, getState).then(charactersList => {
        downloadAllItems(charactersList, dispatch, getState);
      });
    }
  };
};
