import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import PropTypes from 'prop-types';
import Container from 'react-data-container';

// Components
import Drawer from "src/router/Drawer/index";

// Other
import { downloadItemsDetails } from "src/redux/actions/items";

@Container({
  isLoading: that => !that.props.itemsDetails,
  onMount: that => {
    that.props.itemsDetails ? null : that.props.downloadItemsDetails(that.props.navigation.state.params.id);
  },
  Error: that => null,
  Loader: that => <View><Text>Loading</Text></View>,
  Redux: {
    mapStateToProps: (state, ownProps) => ({
      itemsDetails: state.items[ownProps.navigation.state.params.id],
      searchPrepared: state.items.searchPrepared
    }),
    actions: { downloadItemsDetails }
  }
})
class Details extends React.Component {
  render() {
    const { name, type, icon, charIds } = this.props.itemsDetails;

    return (
      <Drawer navigation={this.props.navigation} account={this.props.screenProps.account}>
        <Text>{name}</Text>
        <Text>{type}</Text>
        <Image source={{uri: icon}} style={{height: 100, width: 100}}/>

        {this.props.searchPrepared ?
          <View style={{marginTop: 20}}>
            <Text>On characters:</Text>

            {charIds.map(id => (
              <TouchableOpacity key={id} onPress={() => this.props.navigation.navigate("CharactersDetails", {id})}>
                <Text>{id}</Text>
              </TouchableOpacity>
            ))}
          </View>

          :

          null
        }
      </Drawer>
    );
  };
};

export default Details;
