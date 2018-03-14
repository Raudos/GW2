import React from 'react';
import { View } from "react-native";
import Container from 'react-data-container';

// Components
import Tabs from "src/components/TabChanger";
import Coins from "src/components/Exchange/Coins";
import Gems from "src/components/Exchange/Gems";

// Other
import { getExchangeRates } from "src/redux/actions/exchange";

@Container({
  isLoading: that => !that.props.exchange,
  onMount: that => that.props.getExchangeRates(),
  Error: that => null,
  Loader: that => null,
  Redux: {
    mapStateToProps: (state, ownProps) => ({
      exchange: state.exchange
    }),
    actions: { getExchangeRates }
  }
})
class Exchange extends React.Component {
  render() {
    return (
      <Tabs
        exchange={this.props.exchange}
        tabs={[
          {key: 'coins', title: "Gold"},
          {key: 'gems', title: "Gems"},
        ]}
        components={{
          coins: Coins,
          gems: Gems
        }}
      />
    );
  };
};

export default Exchange;
