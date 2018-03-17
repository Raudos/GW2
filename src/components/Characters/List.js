import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import PropTypes from 'prop-types';
import Container from 'react-data-container';

// Other
import { downloadCharactersList } from "src/redux/actions/characters";

@Container({
  isLoading: that => !that.props.charactersList,
  onMount: that => that.props.downloadCharactersList(),
  Error: that => null,
  Loader: that => <View><Text>Loading</Text></View>,
  Redux: {
    mapStateToProps: (state, ownProps) => ({
      charactersList: state.characters ? state.characters.list : false
    }),
    actions: { downloadCharactersList }
  }
})
class CharactersList extends React.Component {
  static propTypes = {
    characters: PropTypes.object.isRequired
  };

  _keyExtractor = (item, index) => item.name;

  _renderItem = ({item}) => {
    return (
      <TouchableOpacity style={{marginBottom: 20}} onPress={() => this.props.navigation.navigate("Details", {id: item.name})}>
        <Text>{item.name}</Text>
        <Text>{item.race}</Text>
        <Text>{item.profession}</Text>
        <Text>{item.level}</Text>
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <FlatList
          data={this.props.charactersList}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
        />
      </View>
    );
  };
};

export default CharactersList;
