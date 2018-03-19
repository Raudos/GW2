import Request from "src/reusables/request";

function fetchCoins(int) {
  return Request({
    url: `https://api.guildwars2.com/v2/commerce/exchange/coins?quantity=${int}`,
  });
};

function fetchGems(int) {
  return Request({
    url: `https://api.guildwars2.com/v2/commerce/exchange/gems?quantity=${int}`,
  });
};

export const coinsToGems = int => {
  return (dispatch, getState) => {
    // Convert to gold
    fetchCoins(int * 10000).then(apiData => {
      dispatch({
        type: "downloadUserCoins",
        data: {
          int,
          ...apiData.data
        }
      });
    }).catch(e => console.log(e));
  };
};

export const gemsToCoins = int => {
  return (dispatch, getState) => {
    fetchGems(int).then(apiData => {
      dispatch({
        type: "downloadUserGems",
        data: {
          int,
          ...apiData.data
        }
      });
    }).catch(e => console.log(e));
  };
};

const gemsSetValues = [100, 300, 500, 1000];
// Bronze, not Gold!!!!
const coinsSetValues = [2000000, 4000000, 8000000, 14000000];

export const getExchangeRates = () => {
  return (dispatch, getState) => {
    const gemsValuesPromisesArr = gemsSetValues.map(int => new Promise((resolve, reject) => {
      fetchGems(int).then(apiData => resolve({int, ...apiData.data}));
    }));
    const coinsValuesPromisesArr = coinsSetValues.map(int => new Promise((resolve, reject) => {
      fetchCoins(int).then(apiData => resolve({int, ...apiData.data}));
    }));

    Promise.all(gemsValuesPromisesArr.concat(coinsValuesPromisesArr)).then(values => {
      const gems = values.slice(0, gemsSetValues.length);
      const coins = values.slice(gemsSetValues.length, values.length);

      dispatch({
        type: "downloadBasicExchange",
        data: {
          gems,
          coins
        }
      });
    }).catch(e => console.log(e));
  };
};
