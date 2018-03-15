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

export const downloadCharactersList = () => {
  return (dispatch, getState) => {
    const apiKey = getState().apiKey;
    const detailedCharacters = [];

    function areCharactersFetched(allChars, downloadedChars, dispatch) {
      if (allChars.length === downloadedChars.length) {
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
