import React from 'react';
import { View, Text, FlatList } from "react-native";
import Container from 'react-data-container';
import PropTypes from 'prop-types';

// Components
import Drawer from "src/router/Drawer/index";

// Other
import { downloadRaids } from "src/redux/actions/raids";

@Container({
  isLoading: that => !that.props.raids,
  onMount: that => that.props.downloadRaids(),
  Error: that => null,
  Loader: that => null,
  Redux: {
    mapStateToProps: (state, ownProps) => ({
      raids: state.raids
    }),
    actions: { downloadRaids }
  }
})
class Raids extends React.Component {
  static propTypes = {
    raids: PropTypes.object.isRequired
  };

  _keyExtractor = (item, index) => item.id;

  // for now if there is no apiKey added accountLock will be a bool holding true
  _isApiKey = () => this.props.raids.accountLock && typeof this.props.raids.accountLock !== "boolean";

  _renderItem = ({item}) => {
    return (
      <View style={{marginBottom: 20}}>
        <Text>{item.id}</Text>

        <View>
          {item.events.map(encounter => (
            <View key={encounter.id} style={{flexDirection: "row"}}>
              <Text>{encounter.id}</Text>

              {this._isApiKey() && this.props.raids.accountLock.includes(encounter.id) ?
                <Text> - COMPLETED</Text>

                :

                null
              }
            </View>
          ))}
        </View>
      </View>
    );
  };

  render() {
    return (
      <Drawer navigation={this.props.navigation} account={this.props.screenProps.account}>
        <FlatList
          data={this.props.raids.raidsData}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
        />
      </Drawer>
    );
  };
};

export default Raids;
