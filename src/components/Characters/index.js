import React from 'react';
import { View, Text, FlatList } from "react-native";
import PropTypes from 'prop-types';
import { SwitchNavigator } from 'react-navigation';

// Components
import List from "src/components/Characters/List";
import Details from "src/components/Characters/Details";
import Drawer from "src/router/Drawer";

const Navigator = SwitchNavigator({
  CharactersList: {
    screen: List
  },
  CharactersDetails: {
    screen: Details
  }
}, {
  initialRouteName: "CharactersList",
  headerMode: "none"
});

class Characters extends React.Component {
  static router = Navigator.router;

  render() {
    return (
      <Drawer navigation={this.props.navigation}>
        <Navigator
          navigation={this.props.navigation}
        />
      </Drawer>
    );
  };
};

export default Characters;
