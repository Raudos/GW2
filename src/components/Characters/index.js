import React from 'react';
import { View, Text, FlatList } from "react-native";
import PropTypes from 'prop-types';
import { SwitchNavigator } from 'react-navigation';

// Components
import List from "src/components/Characters/List";
import Details from "src/components/Characters/Details";

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
      <Navigator
        navigation={this.props.navigation}
      />
    );
  };
};

export default Characters;
