import KeyUpdater from "src/redux/reducers/key";
import AccountUpdater from "src/redux/reducers/account";
import DailiesUpdater from "src/redux/reducers/dailies";
import ExchangeUpdater from "src/redux/reducers/exchange";
import CharactersUpdater from "src/redux/reducers/characters";

export default (currentState, action) => {
  var nextState = {...currentState};

  return {
    apiKey: KeyUpdater(currentState.apiKey, action),
    account: AccountUpdater(currentState.account, action),
    dailies: DailiesUpdater(currentState.dailies, action),
    exchange: ExchangeUpdater(currentState.exchange, action),
    characters: CharactersUpdater(currentState.characters, action)
  };
};
