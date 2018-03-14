import React from 'react';
import { View, Text } from "react-native";

export default props => {
  return (
    <View>
      {props.exchange.gems.map((exchange, index) => (
        <View key={index}>
          <Text>{`${exchange.int} gives ${exchange.quantity / 10000} gold`}</Text>
        </View>
      ))}
    </View>
  );
};
