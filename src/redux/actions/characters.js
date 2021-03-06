import Request from "src/reusables/request";
import R from "ramda";

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

export class Character {
  constructor(name, core) {
    this.data = {
      name,
      core,
      inventory: null,
      equipment: null
    };
  };

  getItems = (getState) => {
    // Create an array of item ids from inventory and equipment
    // Return array without any duplicates, which is filtered against currently downloaded item details
    const idsArr = [];
    const currentItemsDetails = getState().items;

    this.data.equipment.forEach(item => {
      idsArr.push(item.id);
    });

    this.data.inventory.forEach(bag => {
      idsArr.push(bag.id);

      bag.inventory.forEach(item => {
        if (item) {
          idsArr.push(item.id);
        };
      });
    });

    const uniqueCharacterItemIds = R.uniq(idsArr);
    const newItemIdsArr = uniqueCharacterItemIds.filter(id => !currentItemsDetails[id]);

    return {
      newItemIdsArr,
      uniqueCharacterItemIds
    };
  };

  downloadDetails = (dispatch, getState) => {
    // Download basic data of each item currently on character
    const apiKey = getState().apiKey;
    const equipment = new Promise((resolve, reject) => {
      getCharacter(apiKey, encodeURI(this.data.name), "equipment").then(apiData => resolve(apiData.data));
    });
    const inventory = new Promise((resolve, reject) => {
      getCharacter(apiKey, encodeURI(this.data.name), "inventory").then(apiData => resolve(apiData.data));
    });

    return Promise.all([equipment, inventory]).then(values => {
      this.updateCharactersData("equipment", values[0].equipment);
      this.updateCharactersData("inventory", values[1].bags);

      return this.downloadMissingItemsDetails(dispatch, getState);
    });
  };

  downloadMissingItemsDetails = (dispatch, getState) => {
    // After downloading all ids start downloading missing items descriptions and data
    const itemIds = this.getItems(getState);

    return Request({
      url: `https://api.guildwars2.com/v2/items?ids=${itemIds.newItemIdsArr.join(",")}`,
    }).then(apiData => {
      dispatch({
        type: "downloadCharactersDetails",
        data: {
          ...this.data,
          charItemIds: itemIds.uniqueCharacterItemIds,
          items: apiData.data
        }
      });

      return apiData.data;
    }).catch(e => console.log(e));
  };

  updateCharactersData = (key, val) => {
    this.data[key] = val;
  };
};

export const downloadCharactersDetails = id => {
  return (dispatch, getState) => {
    const coreData = getState().characters.list.filter(character => character.name === id)[0];
    const charactersDetails = new Character(id, coreData);

    charactersDetails.downloadDetails(dispatch, getState);
  };
};

export const downloadCharactersList = () => {
  return (dispatch, getState) => {
    const apiKey = getState().apiKey;
    // TODO
    // Decide how much additional data list needs to fetch, this means avatars, guild names, titles and such

    return getCharacter(apiKey).then(apiData => {
      return Promise.all(apiData.data.map(name => {
        return new Promise((resolve, reject) => {
          getCharacter(apiKey, encodeURI(name), "core").then(detailedCharactersData => resolve(detailedCharactersData.data));
        });
      })).then(values => {
        dispatch({
          type: "downloadCharactersList",
          data: values
        });

        return values;
      });
    });
  };
};
