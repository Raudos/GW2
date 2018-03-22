import React from "react";
import { View, TouchableOpacity, Text, Image } from "react-native";
import Drawer from 'react-native-drawer';
import PropTypes from "prop-types";

// Components
import Menu from "src/router/Drawer/Menu";

export default class DrawerContainer extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    screenProps: PropTypes.shape({
      reduxNavigation: PropTypes.object.isRequired
    })
  };

  shouldComponentUpdate(nextProps) {
    try {
      const currentActiveRoute = nextProps.screenProps.reduxNavigation.routes.slice(-1)[0];
      const containerRoute = this.props.navigation.state;

      return currentActiveRoute.params.timestamp === containerRoute.params.timestamp;
    } catch(e) {
      // Juuuust in case
      return true;
    }
  };

  closeDrawer = () => {
    this._drawer.close();
  };

  render() {
    return (
      <Drawer
        ref={(ref) => this._drawer = ref}
        content={<Menu closeDrawer={this.closeDrawer} navigation={this.props.navigation} account={this.props.account} />}
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
