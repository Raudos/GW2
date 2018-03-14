import Request from "src/reusables/request";
import R from 'ramda';

function groupDailiesIntoCategories(detailedDailies = [], categories = {}) {
  const Categories = {...categories};
  const CatKeys = Object.keys(Categories);

  CatKeys.forEach(key => {
    Categories[key].forEach((daily, index) => {
      const filteredDaily = detailedDailies.filter(detailedDaily => detailedDaily.id === daily.id)[0] || {};

      Categories[key][index] = {
        ...daily,
        ...filteredDaily
      };
    });
  });

  return Categories;
};

export const downloadDailies = () => {
  return (dispatch, getState) => {
    const apiKey = getState().apiKey;

    Request({
      url: "https://api.guildwars2.com/v2/achievements/daily",
      headers: {
        'Authorization': `Bearer ${apiKey}`
      }
    }).then(basicDailyData => {
      const idsArray = R.flatten(Object.values(basicDailyData.data)).map(daily => daily.id).filter(id => id);

      Request({
        url: `https://api.guildwars2.com/v2/achievements?ids=${idsArray.join(",")}`,
        headers: {
          'Authorization': `Bearer ${apiKey}`
        }
      }).then(detailedDailyData => {
        // For some reason details lose categories in which each daily is grouped, only "default" and "pvp" ones are grouped properly

        dispatch({
          type: "downloadDailies",
          data: groupDailiesIntoCategories(detailedDailyData.data, basicDailyData.data)
        });
      }).catch(e => {
        // TODO
      });
    }).catch(e => {
        // TODO
    });
  };
};
