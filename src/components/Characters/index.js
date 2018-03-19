import React from 'react';
import { View, Text, FlatList } from "react-native";
import PropTypes from 'prop-types';
import { StackNavigator } from 'react-navigation';

// Components
import List from "src/components/Characters/List";
import Details from "src/components/Characters/Details";

const Navigator = StackNavigator({
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
      <View style={{flex: 1}}>
        <Navigator
          navigation={this.props.navigation}
        />
      </View>
    );
  };
};

export default Characters;
