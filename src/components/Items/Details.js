import React from 'react';
import { View, Text, ScrollView, Image } from "react-native";
import PropTypes from 'prop-types';
import Container from 'react-data-container';

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
    }),
    actions: { downloadItemsDetails }
  }
})
class Details extends React.Component {
  render() {
    const { name, type, icon } = this.props.itemsDetails;

    return (
      <View style={{flex: 1}}>
        <Text>{name}</Text>
        <Text>{type}</Text>
        <Image source={{uri: icon}} style={{height: 100, width: 100}}/>
      </View>
    );
  };
};

export default Details;
