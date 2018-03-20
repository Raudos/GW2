import React from 'react';
import { View, Text } from "react-native";
import PropTypes from 'prop-types';
import { SwitchNavigator } from 'react-navigation';

// Components
import List from "src/components/Guilds/List";
import Details from "src/components/Guilds/Details";

const Navigator = SwitchNavigator({
  GuildsList: {
    screen: List
  },
  GuildsDetails: {
    screen: Details
  }
}, {
  initialRouteName: "GuildsList",
  headerMode: "none"
});

class Guilds extends React.Component {
  static router = Navigator.router;

  render() {
    return (
      <Navigator
        navigation={this.props.navigation}
      />
    );
  };
};

export default Guilds;
