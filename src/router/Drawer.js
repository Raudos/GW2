import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import Drawer from 'react-native-drawer';
import PropTypes from "prop-types";

const MenuButton = props => (
  <TouchableOpacity onPress={() => props.onPress(props.routeName)}>
    <Text>{props.routeName}</Text>
  </TouchableOpacity>
);

const routes = [
  "KeyManager",
  "CharactersList",
  "ItemsSearch",
  "GuildsList",
  "Raids",
  "Exchange",
  "Dailies"
];

const Menu = (props) => {
  const changeRoute = routeName => {
    props.closeDrawer();
    props.navigation.navigate(routeName);
  };

  return (
    <View style={{flex: 1, backgroundColor: "red"}}>
      {routes.map(routeName => (
        <MenuButton key={routeName} routeName={routeName} onPress={changeRoute} />
      ))}
    </View>
  );
};

export default class DrawerContainer extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired
  };

  closeDrawer = () => {
    this._drawer.close();
  };

  render() {
    return (
      <Drawer
        ref={(ref) => this._drawer = ref}
        content={<Menu closeDrawer={this.closeDrawer} navigation={this.props.navigation} />}
        type="overlay"
        openDrawerOffset={0.2}
        panCloseMask={0.2}
        panOpenMask={0.2}
        acceptPan={true}
        closedDrawerOffset={5}
        tweenHandler={(ratio) => ({
          main: { opacity:(2-ratio)/2 }
        })}
      >
        {this.props.children}
      </Drawer>
    );
  };
};
