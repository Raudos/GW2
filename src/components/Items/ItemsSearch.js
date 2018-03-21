import React from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput } from "react-native";
import PropTypes from 'prop-types';
import Container from 'react-data-container';

// Components
import Drawer from "src/router/Drawer";

// Other
import { prepareSearch } from "src/redux/actions/items";

@Container({
  isLoading: that => !that.props.items.searchPrepared,
  onMount: that => {
    that.props.items.searchPrepared ? null : that.props.prepareSearch();
  },
  Error: that => null,
  Loader: that => <View><Text>Loading</Text></View>,
  Redux: {
    mapStateToProps: (state, ownProps) => ({
      items: state.items
    }),
    actions: { prepareSearch }
  }
})
class ItemsSearch extends React.Component {
  state = {
    input: ""
  };

  _keyExtractor = (item, index) => item.id;

  _renderItem = ({item}) => {
    return (
      <TouchableOpacity onPress={() => this.props.navigation.navigate("ItemsDetails", {id: item.id})}>
        <Text>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  render() {
    const filteredList = Object.values(this.props.items).filter(item => typeof item === "object" && item.name.toLowerCase().includes(this.state.input.toLowerCase()));

    return (
      <Drawer navigation={this.props.navigation}>
        <TextInput
          onChangeText={input => this.setState({input})}
          value={this.state.input}
        />

        <FlatList
          data={this.state.input.length > 3 ? filteredList : []}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
        />
      </Drawer>
    );
  };
};

export default ItemsSearch;
