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
    const detailedRaids = {
      accountLock: null,
      raidsData: []
    };

    fetchRaids().then(apiData => {
      apiData.data.forEach(id => {
        fetchRaids(null, id).then(detailedRaidData => {
          detailedRaids.raidsData.push(detailedRaidData.data);

          isRaidsFetchingCompleted(apiData.data, detailedRaids, dispatch);
        }).catch(e => console.log(e));
      });

      fetchRaids(getState().apiKey).then(accountRaidsData => {
        detailedRaids.accountLock = accountRaidsData.data;

        isRaidsFetchingCompleted(apiData.data, detailedRaids, dispatch);
      }).catch(e => {
        // TODO
        // allow this to do through without apiKey, to only show raids list without information about locked enocunters
        detailedRaids.accountLock = true;
      });
    }).catch(e => console.log(e));
  };
};
