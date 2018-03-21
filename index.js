import React from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';

import { createStore as Store } from "src/redux/store";
import Router from "src/router/index";

const App = props => (
  <Provider store={Store}>
    <Router />
  </Provider>
);

AppRegistry.registerComponent('GW2', () => App);
