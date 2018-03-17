import Request from "src/reusables/request";

function getCharacter(apiKey, name = false, category = "") {
  const headers = {
    'Authorization': `Bearer ${apiKey}`
  };

  if (name) {
    return Request({
      url: `https://api.guildwars2.com/v2/characters/${name}/${category}`,
      headers
    });
  }

  return Request({
    url: "https://api.guildwars2.com/v2/characters",
    headers
  });
};

class Character {
  constructor(name, core) {
    this.data = {
      name,
      core,
      inventory: null,
      equipment: null
    };
  };

  isCharacterDownloaded = (dispatch) => {
    if (this.data.inventory && this.data.equipment) {
      dispatch({
        type: "downloadCharactersDetails",
        data: this.data
      });
    }
  };

  updateCharactersData = (key, val) => {
    this.data[key] = val;
  };
};

function downloadCharactersDetails(apiKey, charactersData, dispatch) {
  const characters = {};

  charactersData.forEach(character => {
    characters[character.name] = new Character(character.name, character);

    getCharacter(apiKey, encodeURI(character.name), "equipment").then(apiData => {
      characters[character.name].updateCharactersData("equipment", apiData.data.equipment);
      characters[character.name].isCharacterDownloaded(dispatch);
    }).catch(e => console.log(e));

    getCharacter(apiKey, encodeURI(character.name), "inventory").then(apiData => {
      characters[character.name].updateCharactersData("inventory", apiData.data.bags);
      characters[character.name].isCharacterDownloaded(dispatch);
    }).catch(e => console.log(e));
  });
};

export const downloadCharactersList = () => {
  return (dispatch, getState) => {
    const apiKey = getState().apiKey;
    const detailedCharacters = [];

    function areCharactersFetched(allChars, downloadedChars, dispatch) {
      if (allChars.length === downloadedChars.length) {
        downloadCharactersDetails(apiKey, downloadedChars, dispatch);

        dispatch({
          type: "downloadCharactersList",
          data: detailedCharacters
        });
      }
    };

    // TODO
    // Decide how much additional data list needs to fetch, this means avatars, guild names, titles and such

    getCharacter(apiKey).then(apiData => {
      apiData.data.forEach(name => {
        getCharacter(apiKey, encodeURI(name), "core").then(detailedCharacterData => {
          detailedCharacters.push(detailedCharacterData.data);

          areCharactersFetched(apiData.data, detailedCharacters, dispatch);
        }).catch(e => console.log(e));
      });
    });
  };
};
