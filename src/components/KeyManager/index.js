import React from 'react';
import { View } from "react-native";
import PropTypes from 'prop-types';

// Components
import AccountInfo from "src/components/KeyManager/AccountInfo";
import AddKey from "src/components/KeyManager/AddKey";

export default class KeyManager extends React.Component {
  render() {
    const { account, deleteKey } = this.props.screenProps;

    return (
      <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
        {account ?
          <AccountInfo account={account} deleteKey={deleteKey} />

          :

          <AddKey {...this.props} />
        }
      </View>
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
