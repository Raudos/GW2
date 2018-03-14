import React from "react";
import { View, Text } from "react-native";
import PropTypes from 'prop-types';

const DailyTab = props => {
  const pickedDailies = props.dailies[props.activeTab] || [];

  return (
    <View style={{flex: 1}}>
      {pickedDailies.map(daily => (
        <View key={daily.id}>
          <Text>{daily.id}</Text>
          <Text>{daily.name}</Text>
          <Text>{JSON.stringify(daily.required_access)}</Text>
        </View>
      ))}
    </View>
  );
};

DailyTab.propTypes = {
  dailies: PropTypes.object.isRequired,
  activeTab: PropTypes.string.isRequired
};

export default DailyTab;
