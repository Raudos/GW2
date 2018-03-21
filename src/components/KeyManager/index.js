import React from 'react';
import { View } from "react-native";
import PropTypes from 'prop-types';

// Components
import AccountInfo from "src/components/KeyManager/AccountInfo";
import AddKey from "src/components/KeyManager/AddKey";
import Drawer from "src/router/Drawer";

export default class KeyManager extends React.Component {
  render() {
    const { account, deleteKey } = this.props.screenProps;

    return (
      <Drawer navigation={this.props.navigation}>
        <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
          {account ?
            <AccountInfo account={account} deleteKey={deleteKey} />

            :

            <AddKey {...this.props} />
          }
        </View>
      </Drawer>
    );
  };
};

KeyManager.propTypes = {
  screenProps: PropTypes.shape({
    account: PropTypes.object,
    deleteKey: PropTypes.func.isRequired,
    addKey: PropTypes.func.isRequired,
    addDefaultKey: PropTypes.func.isRequired
  })
};
