import React from 'react';
import { View, Text, FlatList } from "react-native";
import Container from 'react-data-container';
import PropTypes from 'prop-types';

// Other
import { downloadCharactersList } from "src/redux/actions/characters";

@Container({
  isLoading: that => !that.props.characters,
  onMount: that => that.props.downloadCharactersList(),
  Error: that => null,
  Loader: that => null,
  Redux: {
    mapStateToProps: (state, ownProps) => ({
      characters: state.characters
    }),
    actions: { downloadCharactersList }
  }
})
class Characters extends React.Component {
  static propTypes = {
    characters: PropTypes.object.isRequired
  };

  _keyExtractor = (item, index) => item.name;

  _renderItem = ({item}) => {
    return (
      <View style={{marginBottom: 20}}>
        <Text>{item.name}</Text>
        <Text>{item.race}</Text>
        <Text>{item.profession}</Text>
        <Text>{item.level}</Text>
      </View>
    );
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <FlatList
          data={this.props.characters.list}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
        />
      </View>
    );
  };
};

export default Characters;
