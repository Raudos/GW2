import React from 'react';
import { View, Text, Button } from "react-native";

export default props => {
  const { account, deleteKey } = props;

  return (
    <View>
      <Text>Account Info</Text>
      <Text>{account.name}</Text>
      <Text>{`Created: ${account.created}`}</Text>
      <Text>{`Age: ${account.age}`}</Text>
      <Text>{`Server: ${account.world}`}</Text>

      <Button
        onPress={deleteKey}
        title="Remove Key"
        color="#841584"
      />
    </View>
  );
};
