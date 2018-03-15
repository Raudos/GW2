import React from 'react';
import { View, Text } from "react-native";
import { DrawerNavigator } from 'react-navigation';
import Container from 'react-data-container';
import PropTypes from 'prop-types';

// Components
import KeyManager from "src/components/KeyManager/index";
import Dailies from 'src/components/Dailies/index';
import Exchange from 'src/components/Exchange/index';
import Characters from "src/components/Characters/index";

// Other
import { addKey, deleteKey, addDefaultKey, retrieveKey } from "src/redux/actions/key";

const Navigator = DrawerNavigator({
  Characters: {
    screen: Characters
  },
  Exchange: {
    screen: Exchange
  },
  Dailies: {
    screen: Dailies
  },
  KeyManager: {
    screen: KeyManager
  },
  App: {
    screen: props => (
      <View>
        <Text>App</Text>
      </View>
    )
  }
}, {
  navigationOptions: {
    header: null
  }
});

@Container({
  isLoading: that => that.props.apiKey === null,
  onMount: that => that.props.retrieveKey(),
  Error: that => null,
  Loader: that => null,
  Redux: {
    mapStateToProps: (state, ownProps) => ({
      apiKey: state.apiKey,
      account: state.account
    }),
    actions: { addKey, deleteKey, addDefaultKey, retrieveKey }
  }
})
class NavigatorWithKey extends React.Component {
  render() {
    return (
      <Navigator
        screenProps={{
          addKey: this.props.addKey,
          deleteKey: this.props.deleteKey,
          addDefaultKey: this.props.addDefaultKey,
          apiKey: this.props.apiKey,
          account: this.props.account
        }}
      />
    );
  };
};

export default NavigatorWithKey;
