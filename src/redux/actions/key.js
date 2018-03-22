import { AsyncStorage } from "react-native";
import myKey from "src/config/key";
import Request from "src/reusables/request";

function getAccountBasicInfo(key) {
  return Request({
    url: "https://api.guildwars2.com/v2/account",
    headers: {
      'Authorization': `Bearer ${key}`
    }
  });
};

function confirmKey(key) {
  return Request({
    url: "https://api.guildwars2.com/v2/tokeninfo",
    headers: {
      'Authorization': `Bearer ${key}`
    }
  });
};

function prepareApplication(key) {
  return Promise.all([getAccountBasicInfo(key), confirmKey(key)]).then(values => ({
    account: Object.assign(values[0].data, {permissions: values[1].data.permissions})
  }));
};

export const retrieveKey = () => {
  return (dispatch, getState) => {
    AsyncStorage.getItem("gw2_app_data").then(data => {
      const parsedData = JSON.parse(data);
      
      dispatch({
        type: "addKey",
        data: parsedData || {key: false, account: null}
      });
    }).catch(e => {
      dispatch({
        type: "addKey",
        data: {
          key: false,
          account: null
        }
      });
    });
  };
};

export const addKey = (key, onFailure = () => {}) => {
  return (dispatch, getState) => {
    prepareApplication(myKey).then(apiData => {
      AsyncStorage.setItem("gw2_app_data", JSON.stringify({key: myKey, ...apiData})).then(data => {
        dispatch({
          type: "addKey",
          data: {
            key: myKey,
            ...apiData
          }
        });
      }).catch(e => {
        onFailure();
      });
    }).catch(e => console.log(e));
  };
};

export const deleteKey = () => {
  return (dispatch, getState) => {
    AsyncStorage.removeItem("gw2_app_data").then(data => {
      dispatch({
        type: "removeKey",
        data: false
      });
    }).catch(e => {
      // TODO
    });
  };
};

export const addDefaultKey = (onFailure = () => {}) => {
  return (dispatch, getState) => {
    prepareApplication(myKey).then(apiData => {
      AsyncStorage.setItem("gw2_app_data", JSON.stringify({key: myKey, ...apiData})).then(data => {
        dispatch({
          type: "addKey",
          data: {
            key: myKey,
            ...apiData
          }
        });
      }).catch(e => {
        onFailure();
      });
    }).catch(e => console.log(e));
  };
};
