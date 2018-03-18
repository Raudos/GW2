import React from 'react';
import { View, Text, ScrollView } from "react-native";
import PropTypes from 'prop-types';
import Container from 'react-data-container';

// Other
import { downloadCharactersDetails } from "src/redux/actions/characters";

@Container({
  isLoading: that => !that.props.charactersDetails,
  onMount: that => {
    that.props.charactersDetails ? null : that.props.downloadCharactersDetails(that.props.navigation.state.params.id);
  },
  Error: that => null,
  Loader: that => <View><Text>Loading</Text></View>,
  Redux: {
    mapStateToProps: (state, ownProps) => ({
      charactersDetails: state.characters[ownProps.navigation.state.params.id],
      items: state.items
    }),
    actions: { downloadCharactersDetails }
  }
})
class Details extends React.Component {
  render() {
    const { core, equipment, inventory } = this.props.charactersDetails;
    const { items } = this.props;

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

            {equipment.map((item, index) => {
              if (item) {
                return <Text key={index}>{`${item.slot} - ${items[item.id].name}`}</Text>;
              }

              return <Text>Empty slot</Text>;
            })}
          </View>

          <View style={{marginBottom: 20}}>
            <Text>Inventory</Text>

            {inventory.map((bag, index) => (
              <View key={index} style={{marginBottom: 10}}>
                <Text>{`${items[bag.id].name} - size: ${bag.size}`}</Text>

                <View>
                  {bag.inventory.map((item, index) => {
                    if (item) {
                      return <Text key={index}>{`${items[item.id].name} - ${item.count}`}</Text>;
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
