import KeyUpdater from "src/redux/reducers/key";
import AccountUpdater from "src/redux/reducers/account";
import DailiesUpdater from "src/redux/reducers/dailies";

export default (currentState, action) => {
  var nextState = {...currentState};

  return {
    apiKey: KeyUpdater(currentState.apiKey, action),
    account: AccountUpdater(currentState.account, action),
    dailies: DailiesUpdater(currentState.dailies, action)
  };
};
