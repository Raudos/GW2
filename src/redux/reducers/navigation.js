import { Navigator } from 'src/router/index';

const initialState = Navigator.router.getStateForAction(Navigator.router.getActionForPathAndParams("KeyManager"));

export default (state = initialState, action = {data: {}}) => {
  // cutting on rerendering for action COMPLETE_TRANSITION
  if (action.type === "Navigation/NAVIGATE" || action.type === "Navigation/BACK") {
    return Navigator.router.getStateForAction({type: action.type, routeName: action.data.routeName, params: {...action.data.params, timestamp: Math.floor(new Date() / 1000)}}, state);
  }

  return state;
};
