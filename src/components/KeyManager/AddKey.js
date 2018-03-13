import React from 'react';
import { View, Text, TextInput, ToastAndroid } from "react-native";
import { Button } from 'react-native-elements'

export default class AddKey extends React.Component {
  state = {
    key: "",
    disableButtons: false
  };

  toggleButtons = () => {
    this.setState(state => ({
      disableButtons: !state.disableButtons
    }));
  };

  onKeyFailure = () => {
    this.toggleButtons();
    ToastAndroid.show("Error", ToastAndroid.SHORT, ToastAndroid.BOTTOM);
  };

  render() {
    return (
      <View>
        <Text>Add Key</Text>

        <TextInput
          onChangeText={key => this.setState({key})}
          value={this.state.key}
        />

        <View style={{flexDirection: "row", alignItems: "center"}}>
          <Button
            containerViewStyle={{marginLeft: 0, marginRight: 15}}
            onPress={() => {
              this.toggleButtons();
              this.props.screenProps.addKey(this.state.key, this.onKeyFailure);
            }}
            title="Add key"
            backgroundColor="blue"
            disabled={this.state.disableButtons || this.state.key.length <= 10}
          />

          <View style={{flex: 1}}/>

          <Button
            containerViewStyle={{marginLeft: 15, marginRight: 0}}
            onPress={() => {
              this.toggleButtons();
              this.props.screenProps.addDefaultKey(this.onKeyFailure);
            }}
            backgroundColor="blue"
            title="Add Default API Key"
            disabled={this.state.disableButtons}
          />
        </View>
      </View>
    );
  };
};
