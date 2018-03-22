import React from 'react';
import { View, Text, ScrollView } from "react-native";
import PropTypes from 'prop-types';
import Container from 'react-data-container';

// Components
import Drawer from "src/router/Drawer/index";

// Other
import { downloadGuildsDetails } from "src/redux/actions/guilds";

@Container({
  isLoading: that => !that.props.guildsDetails,
  onMount: that => {
    that.props.guildsDetails ? null : that.props.downloadGuildsDetails(that.props.navigation.state.params.id);
  },
  Error: that => null,
  Loader: that => <View><Text>Loading</Text></View>,
  Redux: {
    mapStateToProps: (state, ownProps) => ({
      guildsDetails: state.guilds[ownProps.navigation.state.params.id],
    }),
    actions: { downloadGuildsDetails }
  }
})
class Details extends React.Component {
  render() {
    const { name, level, motd, tag, members } = this.props.guildsDetails;

    return (
      <Drawer navigation={this.props.navigation} account={this.props.screenProps.account}>
        <ScrollView>
          <Text>{name}</Text>
          <Text>{tag}</Text>
          <Text>{level}</Text>
          <Text>{motd}</Text>

          <View style={{marginTop: 20}}>
            <Text>{`Members - ${members.length}`}</Text>

            {members.map(member => (
              <View style={{marginBottom: 5}} key={member.name}>
                <Text>{member.name}</Text>
                <Text>{member.rank}</Text>
                <Text>{member.joined || "Unknown"}</Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </Drawer>
    );
  };
};

export default Details;
