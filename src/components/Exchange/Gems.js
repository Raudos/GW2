import React from 'react';
import { View, Text } from "react-native";

// Components
import ExchangeInput from "src/components/Exchange/ExchangeInput";

export default props => {
  return (
    <View>
      <ExchangeInput
        getExchangeRates={props.gemsToCoins}
      />

      {props.exchange.userGemsExchange ?
        <View>
          <Text>{`${props.exchange.userGemsExchange.int} gives ${props.exchange.userGemsExchange.quantity / 10000} gold`}</Text>
        </View>

        :

        null
      }

      {props.exchange.gems.map((exchange, index) => (
        <View key={index}>
          <Text>{`${exchange.int} gives ${exchange.quantity / 10000} gold`}</Text>
        </View>
      ))}
    </View>
  );
};
