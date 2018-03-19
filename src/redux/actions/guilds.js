import Request from "src/reusables/request";

function getGuild(apiKey, name = false, category = "") {
  const headers = {
    'Authorization': `Bearer ${apiKey}`
  };

  return Request({
    url: `https://api.guildwars2.com/v2/guild/${name}/${category}`,
    headers
  });
};

export const downloadGuildsList = () => {
  return (dispatch, getState) => {
    const guilds = getState().account.guilds;
    const apiKey = getState().apiKey;

    const guildsListPromises = guilds.map(id => new Promise((resolve, reject) => {
      getGuild(apiKey, id).then(apiData => resolve(apiData.data));
    }));

    Promise.all(guildsListPromises).then(values => {
      dispatch({
        type: "downloadGuildsList",
        data: values
      });
    });
  };
};

export const downloadGuildsDetails = id => {
  return (dispatch, getState) => {
    const apiKey = getState().apiKey;
    const pickedGuild = getState().guilds.list.filter(guild => guild.id === id)[0];

    getGuild(apiKey, id, "members").then(apiData => {
      dispatch({
        type: "downloadGuildsDetails",
        data: {
          ...pickedGuild,
          members: apiData.data
        }
      });
    });
  };
};
