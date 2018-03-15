import React from 'react';
import { TextInput } from "react-native";

export default class ExchangeInput extends React.Component {
  state = {
    input: ""
  };

  render() {
    return (
      <TextInput
        keyboardType='numeric'
        onChangeText={(input) => this.setState({input})}
        value={this.state.input}
        onEndEditing={() => this.props.getExchangeRates(parseInt(this.state.input))}
      />
    );
  };
};
