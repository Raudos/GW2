import KeyUpdater from "src/redux/reducers/key";
import AccountUpdater from "src/redux/reducers/account";

export default (currentState, action) => {
  var nextState = {...currentState};

  return {
    apiKey: KeyUpdater(currentState.key, action),
    account: AccountUpdater(currentState.account, action)
  };
};
