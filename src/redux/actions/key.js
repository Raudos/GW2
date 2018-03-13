import { AsyncStorage } from "react-native";
import myKey from "src/config/key";
import Request from "src/reusables/request";

function confirmKey(key) {
  return Request({
    url: "https://api.guildwars2.com/v2/account",
    headers: {
      'Authorization': `Bearer ${key}`
    }
  });
};

export const retrieveKey = () => {
  return (dispatch, getState) => {
    AsyncStorage.getItem("gw2_app_data").then(data => {
      const parsedData = JSON.parse(data);

      dispatch({
        type: "addKey",
        data: {
          key: parsedData.key,
          account: parsedData.account
        }
      });
    }).catch(e => {
      // TODO
    });
  };
};

export const addKey = (key, onFailure = () => {}) => {
  return (dispatch, getState) => {
    confirmKey(key).then(apiData => {
      AsyncStorage.setItem("gw2_app_data", JSON.stringify({key, account: apiData.data})).then(data => {
        dispatch({
          type: "addKey",
          data: {
            key,
            account: apiData.data
          }
        });
      }).catch(e => {
        onFailure();
      });
    }).catch(e => {
      onFailure();
    });
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
    confirmKey(myKey).then(apiData => {
      AsyncStorage.setItem("gw2_app_data", JSON.stringify({key: myKey, account: apiData.data})).then(data => {
        dispatch({
          type: "addKey",
          data: {
            key: myKey,
            account: apiData.data
          }
        });
      }).catch(e => {
        onFailure();
      });
    }).catch(e => {
      onFailure();
    });
  };
};
