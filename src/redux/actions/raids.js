import Request from "src/reusables/request";

function fetchRaids(apiKey = false, raid = "") {
  if (apiKey) {
    return Request({
      url: `https://api.guildwars2.com/v2/account/raids`,
      headers: {'Authorization': `Bearer ${apiKey}`}
    });
  }

  if (raid) {
    return Request({
      url: `https://api.guildwars2.com/v2/raids/${raid}`
    });
  }

  return Request({
    url: "https://api.guildwars2.com/v2/raids"
  });
};

function transformRaidData(data) {
  // It seems that API fetches raids a little bit differently than normal player sees them in the game
  return {
    ...data,
    raidsData: Object.values(data.raidsData).reduce((prev, curr) => prev.concat(curr.wings), [])
  };
};

function isRaidsFetchingCompleted(gameRaids, detailedRaidsData, dispatch) {
  if (detailedRaidsData.accountLock && gameRaids.length === detailedRaidsData.raidsData.length) {
    dispatch({
      type: "downloadRaids",
      data: transformRaidData(detailedRaidsData)
    });
  }
};

export const downloadRaids = () => {
  return (dispatch, getState) => {
    const apiKey = getState().apiKey;

    fetchRaids().then(apiData => {
      const detailedRaidDataPromises = apiData.data.map(id => new Promise((resolve, reject) => {
        fetchRaids(null, id).then(detailedRaidData => resolve(detailedRaidData.data));
      }));

      const accountRaidLockDataPromises = new Promise((resolve, reject) => {
        fetchRaids().then(accountRaidLockData => resolve(accountRaidLockData.data));
      });


      Promise.all(detailedRaidDataPromises.concat(accountRaidLockDataPromises)).then(values => {
        dispatch({
          type: "downloadRaids",
          data: transformRaidData({
            accountLock: values[3],
            raidsData: [values[0], values[1], values[2]]
          })
        });
      });
    }).catch(e => console.log(e));
  };
};
