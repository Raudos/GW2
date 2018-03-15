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
    function isFetchingFinished(fetchedData) {
      if (fetchedData.gems.length === gemsSetValues.length && fetchedData.coins.length === coinsSetValues.length) {
        dispatch({
          type: "downloadBasicExchange",
          data: fetchedData
        });
      }
    };

    const fetchedData = {
      gems: [],
      coins: []
    };

    gemsSetValues.forEach(int => {
      fetchGems(int).then(apiData => {
        fetchedData.gems.push({
          int,
          ...apiData.data
        });

        isFetchingFinished(fetchedData);
      }).catch(e => console.log(e));
    });

    coinsSetValues.forEach(int => {
      fetchCoins(int).then(apiData => {
        fetchedData.coins.push({
          int,
          ...apiData.data
        });

        isFetchingFinished(fetchedData);
      }).catch(e => console.log(e));
    });
  };
};
