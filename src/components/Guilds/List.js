import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import PropTypes from 'prop-types';
import Container from 'react-data-container';

// Other
import { downloadGuildsList } from "src/redux/actions/guilds";

@Container({
  isLoading: that => !that.props.guildsList,
  onMount: that => {
    that.props.guildsList ? null : that.props.downloadGuildsList();
  },
  Error: that => null,
  Loader: that => <View><Text>Loading</Text></View>,
  Redux: {
    mapStateToProps: (state, ownProps) => ({
      guildsList: state.guilds ? state.guilds.list : false
    }),
    actions: { downloadGuildsList }
  }
})
class GuildsList extends React.Component {
  static propTypes = {
    guilds: PropTypes.object.isRequired
  };

  _keyExtractor = (item, index) => item.name;

  _renderItem = ({item}) => {
    return (
      <TouchableOpacity style={{marginBottom: 20}} onPress={() => this.props.navigation.navigate("GuildsDetails", {id: item.id})}>
        <Text>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <FlatList
          data={this.props.guildsList}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
        />
      </View>
    );
  };
};

export default GuildsList;
