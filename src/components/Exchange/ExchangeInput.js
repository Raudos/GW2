import React from 'react';
import { TextInput } from "react-native";
import PropTypes from 'prop-types';

export default class ExchangeInput extends React.Component {
  static propTypes = {
    getExchangeRates: PropTypes.func.isRequired
  };

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
