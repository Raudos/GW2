import React from 'react';
import { View } from "react-native";
import Container from 'react-data-container';

// Components
import Tabs from "src/components/TabChanger";
import Coins from "src/components/Exchange/Coins";
import Gems from "src/components/Exchange/Gems";
import Drawer from "src/router/Drawer/index";

// Other
import { getExchangeRates, coinsToGems, gemsToCoins } from "src/redux/actions/exchange";

@Container({
  isLoading: that => !that.props.exchange,
  onMount: that => that.props.getExchangeRates(),
  Error: that => null,
  Loader: that => null,
  Redux: {
    mapStateToProps: (state, ownProps) => ({
      exchange: state.exchange
    }),
    actions: { getExchangeRates, coinsToGems, gemsToCoins }
  }
})
class Exchange extends React.Component {
  render() {
    return (
      <Drawer navigation={this.props.navigation} account={this.props.screenProps.account}>
        <Tabs
          exchange={this.props.exchange}
          coinsToGems={this.props.coinsToGems}
          gemsToCoins={this.props.gemsToCoins}
          tabs={[
            {key: 'coins', title: "Gold"},
            {key: 'gems', title: "Gems"},
          ]}
          components={{
            coins: Coins,
            gems: Gems
          }}
        />
      </Drawer>
    );
  };
};

export default Exchange;
