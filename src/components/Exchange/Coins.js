import React from 'react';
import { View, Text } from "react-native";

// Components
import ExchangeInput from "src/components/Exchange/ExchangeInput";

export default props => {
  return (
    <View>
      <ExchangeInput
        getExchangeRates={props.coinsToGems}
      />

      {props.exchange.userCoinsExchange ?
        <View>
          <Text>{`${props.exchange.userCoinsExchange.int} gives ${props.exchange.userCoinsExchange.quantity} gems`}</Text>
        </View>

        :

        null
      }

      {props.exchange.coins.map((exchange, index) => (
        <View key={index}>
          <Text>{`${exchange.int / 10000} gives ${exchange.quantity} gems`}</Text>
        </View>
      ))}
    </View>
  );
};
