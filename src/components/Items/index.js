import React from 'react';
import { View, Text } from "react-native";
import PropTypes from 'prop-types';
import { SwitchNavigator } from 'react-navigation';

// Components
import ItemsSearch from "src/components/Items/ItemsSearch";
import Details from "src/components/Items/Details";
import Drawer from "src/router/Drawer";

const Navigator = SwitchNavigator({
  ItemsSearch: {
    screen: ItemsSearch
  },
  ItemsDetails: {
    screen: Details
  }
}, {
  initialRouteName: "ItemsSearch",
  headerMode: "none"
});

class Items extends React.Component {
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

export default Items;
