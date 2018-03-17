import React from 'react';
import { View, Text, ScrollView } from "react-native";
import PropTypes from 'prop-types';
import Container from 'react-data-container';

@Container({
  isLoading: that => !that.props.charactersDetails,
  Error: that => null,
  Loader: that => <View><Text>Loading</Text></View>,
  Redux: {
    mapStateToProps: (state, ownProps) => ({
      charactersDetails: state.characters[ownProps.navigation.state.params.id]
    }),
    actions: { }
  }
})
class Details extends React.Component {
  render() {
    const { core, equipment, inventory } = this.props.charactersDetails;

    // Keys as indexes, ids will be the same when it comes to bags or certain weapons/accesories/rings
    // its not like there will be any operations on em anyway

    return (
      <View style={{flex: 1}}>
        <ScrollView>
          <Text>{core.name}</Text>
          <Text>{core.race}</Text>
          <Text>{core.profession}</Text>
          <Text>{core.level}</Text>

          <View style={{marginBottom: 20, marginTop: 20}}>
            <Text>Equipment</Text>

            {equipment.map((item, index) => (
              <Text key={item.id}>{`${item.slot} - ${item.id}`}</Text>
            ))}
          </View>

          <View style={{marginBottom: 20}}>
            <Text>Inventory</Text>

            {inventory.map((bag, index) => (
              <View key={index} style={{marginBottom: 10}}>
                <Text>{`${bag.id} - size: ${bag.size}`}</Text>

                <View>
                  {bag.inventory.map((item, index) => {
                    if (item) {
                      return <Text key={index}>{`${item.id} - ${item.count}`}</Text>;
                    }

                    return <Text key={index}>Empty slot</Text>;
                  })}
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    );
  };
};

export default Details;
