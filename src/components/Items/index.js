import React from 'react';
import { View, Text } from "react-native";
import PropTypes from 'prop-types';
import { StackNavigator } from 'react-navigation';

// Components
import ItemsSearch from "src/components/Items/ItemsSearch";
import Details from "src/components/Items/Details";

const Navigator = StackNavigator({
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
      <View style={{flex: 1}}>
        <Navigator
          navigation={this.props.navigation}
        />
      </View>
    );
  };
};

export default Items;
