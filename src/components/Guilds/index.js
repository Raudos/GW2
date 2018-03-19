import React from 'react';
import { View, Text } from "react-native";
import PropTypes from 'prop-types';
import { StackNavigator } from 'react-navigation';

// Components
import List from "src/components/Guilds/List";
import Details from "src/components/Guilds/Details";

const Navigator = StackNavigator({
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
      <View style={{flex: 1}}>
        <Navigator
          navigation={this.props.navigation}
        />
      </View>
    );
  };
};

export default Guilds;
