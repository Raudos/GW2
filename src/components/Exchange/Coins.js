import React from 'react';
import { View, Text } from "react-native";

export default props => {
  return (
    <View>
      {props.exchange.coins.map((exchange, index) => (
        <View key={index}>
          <Text>{`${exchange.int / 10000} gives ${exchange.quantity} gems`}</Text>
        </View>
      ))}
    </View>
  );
};
