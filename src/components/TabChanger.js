import * as React from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import { TabViewAnimated, TabBar } from 'react-native-tab-view';
import PropTypes from 'prop-types';

// Components
const LoaderComponent = props => <View/>;

const initialLayout = {
  height: 0,
  width: Dimensions.get('window').width,
};

export default class TabView extends React.Component {
  static propTypes = {
    tabs: PropTypes.array.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      index: 0,
      routes: this.props.tabs
    };
  };

  handleIndexChange = index => this.setState({ index });

  renderHeader = props => {
    return (
      <TabBar
        {...props}
        scrollEnabled={this.props.scrollEnabled}
        indicatorStyle={{
          backgroundColor: "black",
          height: 4,
          bottom: 0,
          borderTopRightRadius: 10,
          borderTopLeftRadius: 10
        }}
        style={{
          backgroundColor: "white",
          borderBottomColor: "white",
          borderBottomWidth: 1
        }}
        labelStyle={{
          margin: 4,
          fontSize: 18,
          color: "black"
        }}
      />
    );
  };

  renderScene = ({ layout, route }) => {
    if (layout.measured) {
      const PickedComponent = this.props.components[route.key] || null;

      return <PickedComponent {...this.props} activeTab={route.key} currentComponent={this.props.tabs[this.state.index].key} />;
    }

    return <LoaderComponent loadingText="Loading"/>;
  };

  render() {
    return (
      <TabViewAnimated
        style={styles.container}
        navigationState={this.state}
        renderScene={this.renderScene}
        renderHeader={this.renderHeader}
        onIndexChange={this.handleIndexChange}
        initialLayout={initialLayout}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
